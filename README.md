# Jira Clone

Jira is a software suite originally developed by Atlassian. It allows users to create and manage projects using the *agile* project management framework. Work is organized into smaller, more approachable chunks that a developer can complete on their own.

### [Hosted Demo](jira-clone.christopher-trent.com)

## Technologies Used
The backend for this project is written in Ruby on Rails leveraging rails' large ecosystem of supporting libraries. The most important of these supporting libraries is JBuilder. Jbuilder allows for the extraction and formatting of ActiveRecord entities into JSON.  
The frontend is implemented in React with Redux, using thunk and ajax to drive communication with the backend.  
It is important also to highlight the impact of one development tool: ESLint. Many hours of tedious debugging were saved because I took the time to create a strong ESLint configuration at the start of my project.

## Feature Spotlight
This section will highlight certain features that were particularly interesting to implement and polish.
### [Login/Register page](https://github.com/ChristopherJTrent/Jira_Clone/blob/main/frontend/src/pages/session.jsx)
The login/register page was particularly difficult due to the way that Jira's authentication flow is structured. On Jira, in order to register an account, you must input and verify your email before being allowed to set your name and password. My reproduction doesn't include email functionality so I had to make decisions about how to structure that flow to remain as faithful as possible to the original. On my reproduction I made the page backgrounds transition into eachother. The CSS for this was difficult to get right, and is shown below.
```css
#bg-container-1 {
	height: 100%;
	top: 0px;
	left: 0px;
	transition: visibility 0.75s, opacity 0.75s;
	visibility: visible;
	opacity: 1;
	&.transparent{
		visibility: hidden;
		opacity: 0;
		transition: visibility 0s 0.75s, opacity 0.75s;
	}
}
#bg-container-2 {
	bottom: 0px;
	width: 360px;
	left: calc(-1 * 100vw / 2);
	transition: left 0.75s;
	&.visible {
		left: 0px;
	}
	& svg {
		position: absolute;
		bottom: 0px;
	}
}

#bg-container-3 {
	bottom: 0px;
	width: 360px;
	left: unset;
	right: calc(-1 * 100vw / 2);
	transition: right 0.75s;
	&.visible {
		right: 0px;
	}
	& svg {
		position: absolute;
		bottom: 0px;
	}
}
```

### Epics
An epic is a grand division of work to be done that contains many issues and tasks. Formatting the display of epics was the largest part of this project, and the one that took the most time. In my reproduction, the only supported type of project is a "Kanban" board. This allows users to organize their tasks into 3 categories: To Do, In Progress, and Done.  
This layout necessitated the creation of many different components to allow for the necessary structure. Moving forward, this feature will receive an enhancement allowing for the dragging and dropping of issues to move them between status columns.

## Moving Forward
At present, the most important things to continue work on are as follows.

### Tasks
As the project stands, tasks cannot be created by the user. Moving forward I will be adding CRUD (Create, Read, Update, Destroy) functionality for tasks. 

### Drag and Drop
Currently, the only way to change the status of a task is to edit the seed data. In the future this will be updated so a user can drag a task from one column to another to change its status.
