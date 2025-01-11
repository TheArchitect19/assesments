import { IErrorMessage } from "types/error";
import { ISuccessMessage } from "types/success";

export const OK_ResponseMessage: Record<ISuccessMessage, string> = {
    'Email Sent': 'Email sent successfully.',
    "Success": "Success",
    // Authentication Success Messages
    'Signup Success': 'Your signup was successful.',
    'Login Success': 'You have successfully logged in.',
    'Logout Success': 'You have been successfully logged out.',
    'Interview Scheduled': 'Mock interview request created'
};

export const NotOK_ResponseMessage: Record<IErrorMessage, string> = {
    // Token-related Error Messages
    'Token Error': 'Error with token processing.',
    'Token Expired': 'Token has expired. Please authenticate again.',
    'Token Invalid': 'Invalid token provided.',
    'Token Missing': 'Token is missing. Please provide a valid token.',


    // Authentication Error Messages
    'Wrong Creds': 'Incorrect username or password.',
    'No Account Found': 'No account found with Provided credentials.',
    'User Not Found': 'User with this QR code not found.',
    'Account Already Exists':
        'An account with this Email already exists, If You have any problem regarding your account please contact us. or you can login with this Email.',
    'Signup Failed': 'Failed to create an account.',
    'Login Failed': 'Login failed. Please check your credentials.',
    "Email Send Failed": "Failed to send email.",
    "Unauthorized": 'Unauthorized access. Please login.',
    "Forbidden": 'Access to this resource is forbidden.',
    'Not Found': 'The requested resource was not found.',
    'Internal Server Error': 'Internal server error. Please try again later.',
    'Something went Wrong': 'Something unexpected happened. Please try again.',

}