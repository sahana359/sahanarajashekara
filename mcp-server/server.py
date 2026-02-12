import json
from pathlib import Path
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("Portfolio MCP Server")

# Data directory
DATA_DIR = Path(__file__).parent / "data" / "json"


def load_json(filename: str) -> dict:
    """Load a JSON file from the data directory."""
    with open(DATA_DIR / filename, "r") as f:
        return json.load(f)


# ============== RESOURCES ==============
# Resources are passive data that the LLM can read

@mcp.resource("portfolio://about")
def get_about() -> str:
    """Get information about Sahana."""
    data = load_json("about.json")
    return json.dumps(data, indent=2)


@mcp.resource("portfolio://education")
def get_education() -> str:
    """Get Sahana's education details."""
    data = load_json("education.json")
    return json.dumps(data, indent=2)


@mcp.resource("portfolio://experience")
def get_experience() -> str:
    """Get Sahana's work experience."""
    data = load_json("experience.json")
    return json.dumps(data, indent=2)


@mcp.resource("portfolio://projects")
def get_projects() -> str:
    """Get Sahana's projects."""
    data = load_json("projects.json")
    return json.dumps(data, indent=2)


@mcp.resource("portfolio://skills")
def get_skills() -> str:
    """Get Sahana's skills."""
    data = load_json("skills.json")
    return json.dumps(data, indent=2)


@mcp.resource("portfolio://certificates")
def get_certificates() -> str:
    """Get Sahana's certificates."""
    data = load_json("certificates.json")
    return json.dumps(data, indent=2)


@mcp.resource("portfolio://adventures")
def get_adventures() -> str:
    """Get Sahana's adventures."""
    data = load_json("adventures.json")
    return json.dumps(data, indent=2)


@mcp.resource("portfolio://jackie")
def get_jackie() -> str:
    """Get information about Jackie, Sahana's dog."""
    data = load_json("jackie.json")
    return json.dumps(data, indent=2)


# ============== TOOLS ==============
# Tools are functions the LLM can call

@mcp.tool()
def search_projects(query: str) -> str:
    """
    Search for projects by name, technology, or description.
    
    Args:
        query: Search term to find relevant projects
    """
    data = load_json("projects.json")
    query_lower = query.lower()
    
    matching_projects = []
    for project in data["projects"]:
        # Search in name, description, technologies, and categories
        searchable = (
            project["name"].lower() +
            project["description"].lower() +
            " ".join(project["technologies"]).lower() +
            " ".join(project["categories"]).lower()
        )
        if query_lower in searchable:
            matching_projects.append(project)
    
    if not matching_projects:
        return f"No projects found matching '{query}'"
    
    return json.dumps(matching_projects, indent=2)


@mcp.tool()
def get_experience_by_company(company: str) -> str:
    """
    Get experience details for a specific company.
    
    Args:
        company: Company name to search for
    """
    data = load_json("experience.json")
    company_lower = company.lower()
    
    for exp in data["experience"]:
        if company_lower in exp["company"].lower():
            return json.dumps(exp, indent=2)
    
    return f"No experience found for company '{company}'"


@mcp.tool()
def get_skills_by_category(category: str) -> str:
    """
    Get skills filtered by category.
    
    Args:
        category: Category name (e.g., 'languages', 'frontend', 'backend', 'ml_ai', 'tools')
    """
    data = load_json("skills.json")
    category_lower = category.lower().replace(" ", "_")
    
    if category_lower in data["skills"]:
        return json.dumps(data["skills"][category_lower], indent=2)
    
    available = list(data["skills"].keys())
    return f"Category '{category}' not found. Available: {available}"


@mcp.tool()
def get_certificate_by_name(name: str) -> str:
    """
    Get a specific certificate by name.
    
    Args:
        name: Certificate name to search for
    """
    data = load_json("certificates.json")
    name_lower = name.lower()
    
    for cert in data["certificates"]:
        if name_lower in cert["name"].lower():
            return json.dumps(cert, indent=2)
    
    return f"No certificate found matching '{name}'"


@mcp.tool()
def get_jackie_facts() -> str:
    """Get fun facts about Jackie, Sahana's dog."""
    data = load_json("jackie.json")
    return json.dumps({
        "name": data["name"],
        "breed": data["breed"],
        "personality": data["personality"],
        "likes": data["likes"]
    }, indent=2)


# ============== PROMPTS ==============
# Prompts are pre-built templates for common queries

@mcp.prompt()
def introduce_sahana() -> str:
    """Generate an introduction for Sahana."""
    about = load_json("about.json")
    education = load_json("education.json")
    
    # Handle both name formats
    if 'firstName' in about:
        name = f"{about['firstName']} {about['lastName']}"
    else:
        name = about.get('name', 'Sahana Rajashekara')
    
    return f"""Please introduce Sahana based on this information:

Name: {name}
Title: {about['title']}
Summary: {about['summary']}
Highlights: {', '.join(about['highlights'])}
Education: {education['education'][0]['degree']} in {education['education'][0]['field']} from {education['education'][0]['institution']}

Create a warm, professional introduction in first person."""


@mcp.prompt()
def why_hire_sahana() -> str:
    """Generate reasons to hire Sahana."""
    about = load_json("about.json")
    experience = load_json("experience.json")
    projects = load_json("projects.json")
    
    exp_summary = []
    for exp in experience["experience"]:
        exp_summary.append(f"- {exp['role']} at {exp['company']}")
    
    project_summary = []
    for proj in projects["projects"]:
        project_summary.append(f"- {proj['name']}: {proj['description']}")
    
    # Handle both name formats
    if 'firstName' in about:
        name = f"{about['firstName']} {about['lastName']}"
    else:
        name = about.get('name', 'Sahana')
    
    return f"""Based on this information, explain why someone should hire {name}:

Title: {about['title']}
Focus Areas: {', '.join(about['highlights'])}

Experience:
{chr(10).join(exp_summary)}

Projects:
{chr(10).join(project_summary)}

Provide compelling reasons to hire {name}, highlighting skills and experience."""


@mcp.prompt()
def project_deep_dive(project_name: str) -> str:
    """
    Generate a detailed explanation of a specific project.
    
    Args:
        project_name: Name of the project to explain
    """
    data = load_json("projects.json")
    
    for proj in data["projects"]:
        if project_name.lower() in proj["name"].lower():
            return f"""Explain this project in detail:

Name: {proj['name']}
Description: {proj['description']}
Long Description: {proj['longDescription']}
Technologies: {', '.join(proj['technologies'])}
Categories: {', '.join(proj['categories'])}
Highlights: {', '.join(proj['highlights'])}

Provide a detailed, engaging explanation of this project."""
    
    return f"Project '{project_name}' not found."


def main():
    mcp.run()

if __name__ == "__main__":
    main()