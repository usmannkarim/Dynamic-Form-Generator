# Dynamic Form Generator

Overview: 
This project is a Dynamic Form Generator built using HTML, CSS, and JavaScript. The tool allows users to create customizable forms dynamically based on input fields defined by the user. The forms generated can be saved in JSON format, and previously saved forms can be reloaded and edited. Users can add fields, define the field types, specify if a field is mandatory, and provide options for dropdown fields.

 Features
- Field Customization: Define form fields by specifying the name, type, and whether the field is mandatory.
- Dynamic Form Creation: Generate forms dynamically based on user input.
- JSON Storage: Save and load forms in JSON format.
- Form Management: Load previously saved forms and view the last 10 submissions.
- Submission Tracking: Save and display multiple submissions for each form.
- Error Handling: Displays success and error messages based on user actions.
- Bonus Features:
  - Ability to store data in either JSON or XML format.
  - Import users from Excel files.
  - Capture additional user attributes such as Date of Birth (DOB) and Phone Number.

 Project Structure
- index.html: The main page for the dynamic form generator interface.
- style.css: The stylesheet containing all the necessary styling for the project.
- index.js: The main JavaScript file responsible for the dynamic functionality of the form generator.

 How to Run the Project
Follow these steps to run the project locally:

1. Clone the Repository:
   ``` git clone https://github.com/usmannkarim/Dynamic-Form-Generator.git ```
   
2. Navigate to the Project Directory:
   ``` cd Dynamic-Form-Generator ```

3. Open `index.html` in Your Web Browser:
   - Simply double-click the `index.html` file or use a web server if you prefer:
   ``` open index.html ```

4. Use the Dynamic Form Generator:
   - Add Fields: Use the interface to add rows to the form with the required field details.
   - Save Form: Save the generated form in JSON format using the "Save JSON" button.
   - Load Form: Load an existing form by uploading a JSON file via the "Load JSON" button.
   - Generate Form: Generate the form by clicking the "Generate Form" button. This will navigate you to the form page where you can see the last 10 submissions.
   - Submit Data: Fill out the form and save your submissions. The data will be stored in an array of JSON objects.

 Additional Notes
- Make sure to have a modern web browser that supports the features used in this project.
- The project is designed to be easily extendable. You can add more field types or functionalities as needed.

Feel free to contribute to this project by opening issues or submitting pull requests on GitHub.
