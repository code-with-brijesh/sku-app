# Medication SKU Catalogue Management System

This Django application is designed to streamline the creation, management, and tracking of medication SKUs. It empowers case managers with an intuitive interface to handle medication data efficiently, while providing clients with access to reports and the ability to submit necessary documentation.

## Features

- **Comprehensive SKU Management:** Create, edit, and deactivate medication SKUs, ensuring accurate and up-to-date medication information.
- **Streamlined Case Management:** Simplify case management workflows for efficient handling of medication needs.
- **Client Access and Reporting:** Offer clients a secure portal for accessing reports and submitting required documentation, fostering collaboration.
- **Robust Security:** Prioritize data security with secure user authentication and access controls.
- **Customization (Optional):** Tailor the system to your specific needs by extending functionalities through custom models and views.

## Installation

### Prerequisites:

- Python 3.10 (ensure you have it installed on your system)
- Virtual Environment (recommended): Create one using `python3.10 -m venv venv` and activate it (`source venv/bin/activate` on Linux/macOS, `venv\Scripts\activate` on Windows).

### Install Dependencies:

```bash
pip install -r requirements.txt

### Running the Application:
Activate Virtual Environment (if applicable).

 cd into your projects root directory

Start the Development Server:
```bash

python manage.py runserver


bash```

- This will make the application accessible at http://localhost:8000 in your web browser.

Running Tests:
```bash

python manage.py test skus --verbosity 3


bash```


### Usage:
- User Authentication: Follow Django's authentication system to create user accounts and manage permissions.
- Medication SKU Management: Access functionalities through the Django admin interface or custom views (depending on your implementation).
- Case Management: Develop custom views or forms to manage cases and associate them with medication SKUs (consider using Django's forms framework).
- Client Access and Reporting: Implement a client portal using Django REST framework or similar to provide secure  access to reports and document submission functionalities.

### Contributing:
- We welcome contributions to enhance this project! Please refer to the project's contribution guidelines (if available) or create a pull request with clear explanations of your changes.

### License:
- This project is licensed under the MIT License. See the LICENSE file for details. This license provides a permissive and flexible foundation for you to use, modify, and distribute the code.

### Additional Considerations:
Testing: Implement a robust testing strategy using Django's built-in testing framework or third-party libraries like pytest.
Deployment: Consider deployment options like Heroku, AWS, or a VPS for production use.
Documentation: Create comprehensive documentation (user guides, API references) for users and developers.
