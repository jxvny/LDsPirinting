## Introduction

LD's Printing Application is an application that allows users to upload any image of their choice and 
upload it to our servers and purchase their customized directly from their fingertips. 

## User Flow
***Unauthorized User Flow (Not logged in)***

Users will launch the application on the home screen

Home Screen -> where they will have the options to choose Gallery, Create Your own, 
or login/signup.

Gallery Screen -> Displayes a portfolio of items which resembles how the product may turn out.

Create Your Own Screen -> Begins a 4 step process to customize any product the user chooses; however, if a user is not 
logged in they will not be able to continue into step 2 of the create your own process.

Login/Signup -> This will take the user to the login page which the user will have the option to login, register,
forgot password, or skip the auth flow.

Login Screen -> Takes the user's input for email and password and uses it to check for authentication 
token/credentials which the user will be able to login to experience the full application.

Register Screen -> Takes the user's input for email and password and uses it to the create a authentication 
token/credentials which the user will be able to login to experience the full application.

Forgot Password Screen -> Takes the user's input for email address. If the users email address is within 
the database it will send an reset password email link directly to their email address. The link will take 
the user into a a simple reset password screen which will allow the user to easily change their password.

*** Authorized User Flow (Logged in) ***

Home Screen -> where they will have the options to choose Gallery, Create Your own, 
or Settings.

Gallery Screen -> Displayes a portfolio of items which resembles how the product may turn out.

Create Your Own Screen -> Since the user is logged in, the user can complete all steps of the 
create your own product process.

Step 1 Screen -> Displays a catalog of all items available for customization, including price, image, and title. 
Once a user selects an item they will either move on to the Step 2 Screen or Step 3 Screen depending on
what item the user selected.

Step 2 Screen -> This screen will analyze which SKU the user selected and will add extra steps required 
if required. Extra steps include selecting which shirt size of their choice or what phone they 
would like in order to have the exact case size.

Step 3 Screen -> Displays a simple UI, large square with a default image of an upload image
icon. Once the user taps on the default image it will allow the user to select any image of their choice from 
from their camera roll. The user will not be able to proceed until they have uploaded an image.
Once the user has finished uploading their image the "Next Step" button will light up 
a blue color and the user will be able to proceed to "Step 4" on click.

Step 4 -> This is the final step within the "Create Your Own" process. This screen includes their uploaded image,
product title, price, and user shipping information, a button to update shipping information, and a check out 
button. When the user clicks the check out button the Stripe API takes over and allows the user to type in 
their credit card information for a secured checkout. Once the check out has completed, the 
application stores all information of the purchase and proceeds to the "Thank You" screen.

Thank You Screen -> Simple UI with a thank you message to the user for purchasing a product from us as well as 
more information on where to look at their order status information and invoice. A button will display which will 
take the user back to the "Home Screen".

Settings Screen-> Displays multiple buttons including Orders, Shipping Information, Log Out, Delete Account.

Shipping Information Screen -> Displays the shipping information inputed by the user or "N/A" if the user has yet to 
provide the shipping information. The Shipping information includes first name, last name, address, phone number, zip
code, and state. There will also be a button named "Update Shipping Information". 

Update Shipping Information Screen -> Displays text inputs and item picks to allow the user to input their desired information
such as  first name, last name, address, phone number, zip code, and state. There will also be a amed "Update Shipping Information".
By clicking this button this will store all of the users shipping information and take the user back to the
settings screen.

Order Screen -> This will allow users to view their order information such as tracking information,
status, shipping information and more. This will list all orders in newest to olderst order.

Log Out -> This will not present a new screen; however, run a function that will instantly log the
user out of their account and bring the user back to the "Home Screen".

Delete Account Screen -> Displays a simple screen with a text input for email and password. Once the user
enters their information and clicks the "Delete Account" button this will permenately delete the
users account; however, all user written data will remain within firebase in order to fulfill any 
pending orders.

## Master User Flow 
When the master user logs in it will present a the "Home Screen".

Home Screen -> Displays four buttons, Gallery, Create Your Own, Settings, and Master. The first three buttons will remain
the same as a logged in user; however, the "Master" button will take the user to the "MGMT Portal Screen". 

MGMT Portal Screen -> Displays 3 buttons, "Add To Gallery", "Delete From Gallery", and "Edit Orders".

Add To Gallery Screen -> Displays a Square Image defaulted to a upload image icon. Once the master user click on the square 
it will prompt the master user to select a photo from gallery. Once the photo has been selected. 
The Submit button will light up blue allowing the master user to upload the photo directly to the gallery.

Delete From Gallery Screen -> Displays the Gallery photos and on press this will instantly delete the photo from the gallery.

Edit Orders Screen -> This will allow the master users to modify two lines of data which are status and tracking information.
Which when updated will display on the users orders screen.

## Teck Stack Information 
Languages: JavaScript, JSON, 
Frameworks: React, React Native, Node.JS, 
Libraries: Eas, Expo, Stripe, Firebase, Express

## Database Information
Authentication -> Firebase
User Input Information -> Firebase
Uploaded Images -> Storage Bucket
APIs -> Stripe API
API Server -> EC2 Server
CI/CD -> Lambda, CloudWatch, CodePipeline

## Testing
Jest
Detox
Appium
React / React Native testing libraries
Expo / Expo Doctor testing libraries
CloudWatch

## Notes
Stripe will be in testing mode for this release.
Stripe Test Mode CC information -> CC: 4242-4242-4242-4242 CVC: Any EXP: Any ZIP: Any
Firebase Configuration will be changed when released.

## Login Information
Normal User Login:
test@test.com
password

Master User Login:
test1@test1.com
password

