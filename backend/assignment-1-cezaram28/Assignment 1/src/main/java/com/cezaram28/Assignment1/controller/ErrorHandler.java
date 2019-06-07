package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.dto.ErrorDTO;
import com.cezaram28.Assignment1.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Component
@RestControllerAdvice
public class ErrorHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserNotFoundException.class)
    public ErrorDTO handleBadCredentials(UserNotFoundException e) {
        return new ErrorDTO("Bad credentials!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserExistsException.class)
    public ErrorDTO handleUserExists(UserExistsException e){
        return new ErrorDTO("User already exists!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BannedUserException.class)
    public ErrorDTO handleBannedUser(UserExistsException e){
        return new ErrorDTO("User is banned!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UpvotedException.class)
    public ErrorDTO handleUpvoteException(UpvotedException e){
        return new ErrorDTO("Already upvoted!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DownvotedException.class)
    public ErrorDTO handleDownvoteException(DownvotedException e){
        return new ErrorDTO("Already downvoted!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(YourPostException.class)
    public ErrorDTO handleYourPostException(YourPostException e){
        return new ErrorDTO("Cannot vote your post!");
    }
}
