/**
 * Utility functions to parse AI-generated travel plan text into structured data
 */

export interface ParsedItineraryDay {
  day: number;
  date: string;
  city: string;
  activities: {
    time: string;
    title: string;
    description: string;
    type: 'market' | 'transport' | 'food' | 'activity';
  }[];
  accommodation?: string;
  tip?: string;
}

/**
 * Parse itinerary text into structured day-by-day format
 */
export function parseItinerary(
  itineraryText: string,
  startDate: string,
  endDate: string
): ParsedItineraryDay[] {
  if (!itineraryText || itineraryText.trim().length === 0) {
    return [];
  }

  const days: ParsedItineraryDay[] = [];
  
  // Common Christmas market cities for city extraction
  const commonCities = [
    'Nuremberg', 'Munich', 'Dresden', 'Cologne', 'Frankfurt', 'Berlin', 'Stuttgart', 'Hamburg', 'Rothenburg',
    'Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz',
    'Strasbourg', 'Colmar', 'Paris', 'Lyon',
    'Prague', 'Brno', 'Český Krumlov',
    'Zurich', 'Basel', 'Lucerne',
    'Brussels', 'Bruges', 'Ghent'
  ];
  
  // Split by day markers - improved regex to capture day number and content
  const dayPattern = /Day\s+(\d+)[:\-]?\s*(.*?)(?=Day\s+\d+|$)/gis;
  const dayMatches = [...itineraryText.matchAll(dayPattern)];
  
  if (dayMatches && dayMatches.length > 0) {
    dayMatches.forEach((match, index) => {
      const dayNumber = parseInt(match[1]) || (index + 1);
      const dayText = match[2] || match[0];
      const activities: ParsedItineraryDay['activities'] = [];
      
      // Extract city name - multiple strategies
      let city = extractCityFromDayText(dayText, commonCities);
      
      // Extract date
      const date = calculateDate(startDate, dayNumber - 1);
      
      // Extract activities - improved parsing
      const lines = dayText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      lines.forEach((line, lineIndex) => {
        // Skip day headers
        if (/^Day\s+\d+/i.test(line) && line.length < 50) {
          return;
        }
        
        // Look for time patterns
        const timePatterns = [
          /(\d{1,2})[:.](\d{2})\s*(AM|PM|am|pm)?/i,
          /(\d{1,2})\s*(AM|PM|am|pm)/i,
          /(morning|afternoon|evening|night|midday)/i,
        ];
        
        let time = '09:00';
        let activityText = line;
        let hasTime = false;
        
        // Extract time
        for (const pattern of timePatterns) {
          const timeMatch = line.match(pattern);
          if (timeMatch) {
            hasTime = true;
            if (timeMatch[0].match(/\d/)) {
              // Numeric time
              const hour = parseInt(timeMatch[1] || '9');
              const minute = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
              const period = (timeMatch[3] || '').toUpperCase();
              
              let hour24 = hour;
              if (period === 'PM' && hour < 12) hour24 = hour + 12;
              if (period === 'AM' && hour === 12) hour24 = 0;
              
              time = `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              activityText = line.replace(timeMatch[0], '').trim();
            } else {
              // Text-based time
              time = extractTimeFromText(timeMatch[0]);
              activityText = line.replace(timeMatch[0], '').trim();
            }
            break;
          }
        }
        
        // If no time found but line looks like an activity, assign default times based on position
        if (!hasTime && line.length > 10) {
          if (lineIndex === 0) time = '09:00';
          else if (lineIndex === 1) time = '12:00';
          else if (lineIndex === 2) time = '15:00';
          else if (lineIndex === 3) time = '18:00';
          else time = `${9 + lineIndex * 2}:00`;
        }
        
        // Clean up activity text
        activityText = activityText
          .replace(/^Day\s+\d+[:\-]?\s*/i, '') // Remove "Day X:" prefix
          .replace(/^[:\-]\s*/, '') // Remove leading colons/dashes
          .replace(/^(arrive|visit|explore|travel to|go to|head to)\s+/i, '') // Remove common verbs
          .trim();
        
        // Skip if empty or too short
        if (activityText.length < 5) {
          return;
        }
        
        // Extract title and description
        const title = extractTitle(activityText);
        const description = extractDescription(activityText, title);
        const type = determineActivityType(activityText);
        
        // Only add if we have a meaningful title (not just "Day X")
        if (title && title.length > 3 && !title.toLowerCase().startsWith('day ')) {
          activities.push({
            time,
            title: title.length > 60 ? title.substring(0, 57) + '...' : title,
            description: description || title,
            type,
          });
        }
      });
      
      // If no activities found, create a default one from the day text
      if (activities.length === 0) {
        const cleanText = dayText
          .replace(/Day\s+\d+[:\-]?\s*/gi, '')
          .replace(/^[:\-]\s*/, '')
          .trim()
          .substring(0, 200);
        
        if (cleanText.length > 10) {
          const firstLine = cleanText.split('\n')[0].trim();
          activities.push({
            time: '09:00',
            title: firstLine.length > 60 ? firstLine.substring(0, 57) + '...' : firstLine || `Day ${dayNumber} Activities`,
            description: cleanText,
            type: 'activity' as const,
          });
        }
      }
      
      // Extract accommodation
      const accommodationMatch = dayText.match(/(?:accommodation|hotel|stay|lodging|sleep)[:\-]?\s*(.+?)(?:\n|$)/i);
      const accommodation = accommodationMatch ? accommodationMatch[1].trim().substring(0, 100) : undefined;
      
      // Extract tip
      const tipMatch = dayText.match(/(?:tip|advice|recommendation|pro tip|insider)[:\-]?\s*(.+?)(?:\n|$)/i);
      const tip = tipMatch ? tipMatch[1].trim().substring(0, 200) : undefined;
      
      // Only add day if we have meaningful content
      if (activities.length > 0 || city !== 'Unknown City') {
        days.push({
          day: dayNumber,
          date,
          city: city !== 'Unknown City' ? city : (activities.length > 0 ? 'Various Locations' : 'Unknown City'),
          activities: activities.length > 0 ? activities : [{
            time: '09:00',
            title: `Day ${dayNumber} Activities`,
            description: dayText.substring(0, 200),
            type: 'activity' as const,
          }],
          accommodation,
          tip,
        });
      }
    });
  }
  
  // If no structured days found, try to infer from text structure
  if (days.length === 0) {
    // Try to split by paragraphs or numbered sections
    const sections = itineraryText.split(/\n{2,}/).filter(s => s.trim().length > 20);
    if (sections.length > 0) {
      sections.forEach((section, index) => {
        const dayNumber = index + 1;
        const city = extractCityFromDayText(section, commonCities);
        const date = calculateDate(startDate, dayNumber - 1);
        
        days.push({
          day: dayNumber,
          date,
          city: city !== 'Unknown City' ? city : 'Various Locations',
          activities: [{
            time: '09:00',
            title: section.split('\n')[0].substring(0, 60) || `Day ${dayNumber} Activities`,
            description: section.substring(0, 300),
            type: 'activity' as const,
          }],
        });
      });
    } else {
      // Last resort: single day
      const date = calculateDate(startDate, 0);
      days.push({
        day: 1,
        date,
        city: 'Multiple Cities',
        activities: [{
          time: '09:00',
          title: 'Your Itinerary',
          description: itineraryText.substring(0, 500),
          type: 'activity' as const,
        }],
      });
    }
  }
  
  return days;
}

/**
 * Extract city name from day text using multiple strategies
 */
function extractCityFromDayText(dayText: string, commonCities: string[]): string {
  // Strategy 1: Extract from "Day X: City Name" format
  const dayCityMatch = dayText.match(/Day\s+\d+[:\-]?\s*([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/);
  if (dayCityMatch && dayCityMatch[1]) {
    const candidate = dayCityMatch[1].trim();
    if (candidate.length > 2 && candidate.length < 30 && /^[A-Z]/.test(candidate)) {
      // Verify it's a known city
      if (commonCities.some(c => c.toLowerCase() === candidate.toLowerCase())) {
        return commonCities.find(c => c.toLowerCase() === candidate.toLowerCase()) || candidate;
      }
      // If it looks like a city name, use it
      if (candidate.split(' ').length <= 3) {
        return candidate;
      }
    }
  }
  
  // Strategy 2: Look for city names in common patterns
  const cityPatterns = [
    /(?:in|at|visit|explore|arrive in|travel to|destination:)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/i,
    /([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)\s+(?:Christmas|Market|Christkindlmarkt|Weihnachtsmarkt)/i,
    /City:\s*([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/i,
  ];
  
  for (const pattern of cityPatterns) {
    const match = dayText.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim();
      if (candidate.length > 2 && candidate.length < 30) {
        // Check if it's a known city
        const foundCity = commonCities.find(c => 
          c.toLowerCase() === candidate.toLowerCase() || 
          candidate.toLowerCase().includes(c.toLowerCase()) ||
          c.toLowerCase().includes(candidate.toLowerCase())
        );
        if (foundCity) {
          return foundCity;
        }
        // If it looks reasonable, use it
        if (candidate.split(' ').length <= 3 && /^[A-Z]/.test(candidate)) {
          return candidate;
        }
      }
    }
  }
  
  // Strategy 3: Check if any common cities are mentioned in the text
  for (const city of commonCities) {
    if (dayText.includes(city)) {
      return city;
    }
  }
  
  return 'Unknown City';
}

/**
 * Calculate date from start date and day offset
 */
function calculateDate(startDate: string, dayOffset: number): string {
  try {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch {
    return `Day ${dayOffset + 1}`;
  }
}

/**
 * Format time string
 */
function formatTime(timeStr: string): string {
  // Remove periods, normalize format
  let time = timeStr.replace(/\./g, ':').trim();
  
  // Add :00 if only hour is given
  if (!time.includes(':')) {
    time = time + ':00';
  }
  
  // Ensure two-digit hour
  const parts = time.split(':');
  if (parts[0].length === 1) {
    time = '0' + time;
  }
  
  return time.substring(0, 5); // Return HH:MM format
}

/**
 * Extract time from text line
 */
function extractTimeFromText(line: string): string {
  const lower = line.toLowerCase();
  if (lower.includes('morning')) return '09:00';
  if (lower.includes('afternoon')) return '14:00';
  if (lower.includes('evening')) return '18:00';
  if (lower.includes('night')) return '20:00';
  return '12:00';
}

/**
 * Extract title from line
 */
function extractTitle(line: string): string {
  // Remove time patterns
  let title = line
    .replace(/\d{1,2}[:.]?\d{0,2}\s*(?:AM|PM|am|pm)?/gi, '')
    .replace(/^Day\s+\d+[:\-]?\s*/i, '') // Remove "Day X:" prefix
    .replace(/^[:\-]\s*/, '') // Remove leading colons/dashes
    .trim();
  
  // Remove common prefixes that make titles redundant
  title = title.replace(/^(arrive|visit|explore|travel to|go to|head to|arrive in|arrive at)\s+/i, '');
  
  // Capitalize first letter
  if (title.length > 0) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
  }
  
  // Take first sentence or first 60 chars
  const sentences = title.split(/[.!?]/);
  if (sentences[0] && sentences[0].trim().length > 0) {
    title = sentences[0].trim();
  }
  
  // Clean up common redundant patterns
  title = title.replace(/\s+/g, ' ').trim();
  
  if (title.length > 60) {
    title = title.substring(0, 57) + '...';
  }
  
  return title || 'Activity';
}

/**
 * Extract description from line
 */
function extractDescription(line: string, title?: string): string {
  // Remove time patterns
  let desc = line.replace(/\d{1,2}[:.]?\d{0,2}\s*(?:AM|PM|am|pm)?/gi, '').trim();
  
  // Remove title if provided
  if (title) {
    desc = desc.replace(new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'), '').trim();
  }
  
  // Remove first sentence if it matches title
  const sentences = desc.split(/[.!?]/);
  if (sentences.length > 1) {
    const firstSentence = sentences[0].trim();
    if (title && firstSentence.toLowerCase() === title.toLowerCase()) {
      desc = sentences.slice(1).join('. ').trim();
    } else {
      desc = desc;
    }
  }
  
  // Clean up
  desc = desc.replace(/^[:\-]\s*/, '').trim();
  
  return desc || '';
}

/**
 * Determine activity type from text
 */
function determineActivityType(line: string): 'market' | 'transport' | 'food' | 'activity' {
  const lower = line.toLowerCase();
  
  if (lower.includes('market') || lower.includes('christkindlmarkt') || lower.includes('weihnachtsmarkt')) {
    return 'market';
  }
  if (lower.includes('train') || lower.includes('flight') || lower.includes('bus') || lower.includes('arrival') || lower.includes('departure')) {
    return 'transport';
  }
  if (lower.includes('dinner') || lower.includes('lunch') || lower.includes('breakfast') || lower.includes('café') || lower.includes('restaurant') || lower.includes('food')) {
    return 'food';
  }
  
  return 'activity';
}

/**
 * Extract markets from recommendations text
 */
export function extractMarkets(recommendationsText: string): string[] {
  const markets: string[] = [];
  const commonMarkets = [
    'Nuremberg', 'Munich', 'Dresden', 'Cologne', 'Frankfurt', 'Berlin', 'Stuttgart', 'Hamburg',
    'Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz',
    'Strasbourg', 'Colmar', 'Paris', 'Lyon',
    'Prague', 'Brno',
    'Zurich', 'Basel', 'Lucerne',
    'Brussels', 'Bruges', 'Ghent'
  ];
  
  const lowerText = recommendationsText.toLowerCase();
  commonMarkets.forEach(market => {
    if (lowerText.includes(market.toLowerCase())) {
      markets.push(market);
    }
  });
  
  return [...new Set(markets)]; // Remove duplicates
}

