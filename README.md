# AI-Powered Farm Management Platform

## Try it out

https://happy-desert-0cf68191e.5.azurestaticapps.net/

## Project Description

Our AI-powered platform revolutionizes farm management and analysis, offering an intuitive drag-and-drop interface that simplifies data processing. Farmers can upload CSV files to access AI-generated reports on various critical aspects of their operations.

Key features include:
- Comprehensive Dashboard
- Detailed My Farm section
- Financial Analysis
- Feedback Analysis
- Customer Analysis
- Disease Analysis
- Sales Forecasting
- Virtual Agronomist
- Social Media Integration (Twitter and LinkedIn)

This holistic approach empowers farmers with data-driven insights to make informed decisions, improve productivity, and maintain a healthy, profitable farm.

## Backend Repository

The backend code for this project is available at:
[https://github.com/MarkNwilliam/agritech](https://github.com/MarkNwilliam/agritech)

## Technologies Used

### AI and Machine Learning

- **IBM Watson AI**: We utilize IBM Watson's foundation models, specifically the GRANITE_13B_CHAT_V2 model, for natural language processing and generation. This powers our AI-driven insights across various farm management aspects.

- **Prophet**: For time series forecasting, we use Facebook's Prophet library. It's particularly effective for sales forecasting with strong seasonal effects and several seasons of historical data.

### APIs

- **ISDA Africa Soil Property API**: We integrate this API to fetch soil data based on geographical coordinates. This information is crucial for our virtual agronomist feature, providing soil-specific agricultural advice.

### Backend Framework

- **Flask**: Our backend is built using Flask, a lightweight WSGI web application framework in Python.

## Backend API Overview

Our backend provides a robust set of APIs to support the platform's functionality:

1. `/hello` (GET)
   - A simple endpoint to check if the server is running.

2. `/test_ai` (POST)
   - Tests the AI model with a given prompt.

3. `/forecast` (POST)
   - Generates sales forecasts based on provided CSV data.
   - Uses Prophet for forecasting and IBM Watson AI for explanations.

4. `/my_farm/crop_planning` (POST)
   - Provides crop planning recommendations based on farm data.

5. `/financial_analysis/cash_flow_forecast` (POST)
   - Generates a 12-month cash flow forecast based on financial data.

6. `/disease_analysis/early_detection` (POST)
   - Analyzes crop data for early signs of disease and provides recommendations.

7. `/twitter_ai` (POST)
   - Generates engaging Twitter posts for farm-related topics.

8. `/linkedin_ai` (POST)
   - Creates professional LinkedIn posts about farm-related subjects.

9. `/finance_ai` (POST)
   - Processes financial data and provides a detailed report with recommendations.

10. `/customer_ai` (POST)
    - Analyzes customer data and generates insights for marketing strategies.

11. `/feedback_ai` (POST)
    - Processes customer feedback and provides actionable insights.

12. `/disease_ai` (POST)
    - Analyzes animal health data to detect potential illnesses and suggest actions.

13. `/agronomist_ai` (POST)
    - Integrates soil data from the ISDA Africa API and provides agronomic advice.

## Category Tags
- Productivity
- Project Management
- Utility and Tools

## Demo

![Create-Next-App](https://github.com/user-attachments/assets/c3d2db91-313f-484e-97a5-0fabccbb41c1)
![happy-desert-0cf68191e-5-azurestaticapps-net-agronomist](https://github.com/user-attachments/assets/f7d9361e-4152-4419-9547-18a883bbf219)



