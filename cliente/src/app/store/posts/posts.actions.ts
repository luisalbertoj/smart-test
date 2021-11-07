import { Posts } from './posts.model';
export class AddPost {
  static readonly type = '[POSTS] Add';
  constructor( public payload: Posts ) {}
}
export class RemovePost {
  static readonly type = '[POSTS] Remove';
  constructor( public payload: string ) {}
}
