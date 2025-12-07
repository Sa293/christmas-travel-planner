"""
Main entry point for the Christmas Market Travel Agent.
Provides a user-friendly CLI interface.
"""
import os
import sys
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt, Confirm
from rich.table import Table
from rich.markdown import Markdown
from travel_agent import ChristmasMarketTravelAgent
from config import SUPPORTED_LANGUAGES
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

console = Console()


def print_welcome():
    """Print welcome message."""
    welcome_text = """
🎄 **Christmas Market Travel Agent** 🎄

Welcome! I'm your AI travel assistant specializing in European Christmas markets.
I'll help you plan the perfect Christmas market adventure across Europe!
"""
    console.print(Panel(welcome_text, style="bold cyan"))


def collect_user_preferences() -> dict:
    """Collect user preferences through interactive prompts."""
    console.print("\n[bold]Let's gather some information about your trip:[/bold]\n")
    
    preferences = {}
    
    # Departure city
    preferences['departure_city'] = Prompt.ask(
        "[cyan]What city are you departing from?[/cyan]",
        default="Berlin"
    )
    
    # Travel dates
    preferences['travel_dates'] = Prompt.ask(
        "[cyan]When would you like to travel? (e.g., 'December 15-20, 2024')[/cyan]",
        default="December 2024"
    )
    
    # Duration
    preferences['duration'] = Prompt.ask(
        "[cyan]How many days is your trip?[/cyan]",
        default="5 days"
    )
    
    # Budget
    budget_options = ["Budget-friendly", "Mid-range", "Luxury"]
    budget_choice = Prompt.ask(
        "[cyan]What's your budget range?[/cyan]",
        choices=budget_options,
        default="Mid-range"
    )
    preferences['budget'] = budget_choice
    
    # Interests
    console.print("\n[cyan]What are your main interests? (select multiple, separated by commas)[/cyan]")
    interest_options = ["food", "culture", "shopping", "family-friendly", "nightlife", "history", "architecture"]
    interests_input = Prompt.ask(
        f"Options: {', '.join(interest_options)}",
        default="food, culture"
    )
    preferences['interests'] = [i.strip() for i in interests_input.split(',')]
    
    # Travel pace
    pace_options = ["relaxed", "moderate", "intense"]
    preferences['pace'] = Prompt.ask(
        "[cyan]What's your preferred travel pace?[/cyan]",
        choices=pace_options,
        default="moderate"
    )
    
    # Travel companions
    companions_options = ["Solo", "Couple", "Family", "Friends", "Group"]
    preferences['travel_companions'] = Prompt.ask(
        "[cyan]Who are you traveling with?[/cyan]",
        choices=companions_options,
        default="Couple"
    )
    
    # Language preference
    preferences['language'] = Prompt.ask(
        "[cyan]Preferred language for recommendations?[/cyan]",
        choices=SUPPORTED_LANGUAGES,
        default="en"
    )
    
    return preferences


def display_travel_plan(travel_plan: dict):
    """Display the complete travel plan in a formatted way."""
    console.print("\n" + "="*80)
    console.print("[bold green]Your Personalized Christmas Market Travel Plan[/bold green]")
    console.print("="*80 + "\n")
    
    # Market Recommendations
    if 'market_recommendations' in travel_plan:
        console.print(Panel(
            travel_plan['market_recommendations'].get('recommendations', ''),
            title="[bold]🎄 Recommended Christmas Markets[/bold]",
            border_style="cyan"
        ))
    
    # Itinerary
    if 'itinerary' in travel_plan:
        console.print("\n")
        console.print(Panel(
            travel_plan['itinerary'].get('itinerary', ''),
            title="[bold]📅 Your Itinerary[/bold]",
            border_style="green"
        ))
    
    # Transport
    if 'transport' in travel_plan:
        console.print("\n")
        console.print(Panel(
            travel_plan['transport'].get('transport_options', ''),
            title="[bold]🚂 Transportation Options[/bold]",
            border_style="yellow"
        ))
    
    # Accommodations
    if 'accommodations' in travel_plan:
        console.print("\n")
        console.print(Panel(
            travel_plan['accommodations'].get('accommodations', ''),
            title="[bold]🏨 Accommodation Recommendations[/bold]",
            border_style="magenta"
        ))
    
    # Cultural Insights
    if 'cultural_insights' in travel_plan:
        console.print("\n")
        console.print(Panel(
            travel_plan['cultural_insights'].get('cultural_insights', ''),
            title="[bold]🎭 Cultural Insights & Local Tips[/bold]",
            border_style="blue"
        ))
    
    # Summary
    if 'summary' in travel_plan:
        console.print("\n")
        console.print(Panel(
            travel_plan['summary'],
            title="[bold]📋 Summary[/bold]",
            border_style="white"
        ))


def main():
    """Main function to run the travel agent."""
    try:
        print_welcome()
        
        # Check for API key
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            console.print("[bold red]Error: GEMINI_API_KEY not found![/bold red]")
            console.print("Please set your Gemini API key in a .env file or as an environment variable.")
            console.print("\nExample .env file:")
            console.print("GEMINI_API_KEY=your_api_key_here")
            return
        
        # Initialize travel agent
        console.print("[cyan]Initializing travel agent...[/cyan]\n")
        agent = ChristmasMarketTravelAgent(api_key)
        
        # Collect user preferences
        preferences = collect_user_preferences()
        
        # Confirm before processing
        console.print("\n")
        if not Confirm.ask("[cyan]Ready to create your travel plan?[/cyan]"):
            console.print("[yellow]Cancelled by user.[/yellow]")
            return
        
        # Process request
        console.print("\n[bold cyan]Creating your personalized travel plan...[/bold cyan]")
        console.print("[dim]This may take a moment...[/dim]\n")
        
        travel_plan = agent.process_request(preferences)
        
        # Display results
        display_travel_plan(travel_plan)
        
        # Ask if user wants to save or modify
        console.print("\n")
        if Confirm.ask("[cyan]Would you like to create another travel plan?[/cyan]"):
            main()
        else:
            console.print("\n[bold green]Thank you for using Christmas Market Travel Agent! Safe travels! 🎄[/bold green]")
    
    except KeyboardInterrupt:
        console.print("\n[yellow]Interrupted by user.[/yellow]")
        sys.exit(0)
    except Exception as e:
        console.print(f"\n[bold red]Error: {str(e)}[/bold red]")
        logger.exception("An error occurred:")
        sys.exit(1)


if __name__ == "__main__":
    main()

