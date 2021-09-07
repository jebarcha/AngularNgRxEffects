import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}

    loadUser$ = createEffect(
        () => this.actions$.pipe(
            ofType( userActions.loadUser ),
            mergeMap( ({id}) => this.userService.getUserById(id)
                .pipe(
                    map( user => userActions.loadUserSuccess({ user }) ),
                    catchError( err => of(userActions.loadUserError({payload: err})))
                )
            )
        )

    );


}