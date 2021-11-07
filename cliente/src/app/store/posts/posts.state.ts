import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PostsStateModel } from './posts.model';
import { AddPost, RemovePost } from './posts.actions';

@State({
  name: 'posts',
  defaults: {
    posts: []
  }
})
export class PostsState {
  @Selector()
  static getPosts(state: PostsStateModel): any { return state.posts; }

  // Añade un nuevo post al estado
  @Action(AddPost)
  add({ getState, patchState }: StateContext<PostsStateModel>, { payload }: AddPost): void {
    const state = getState();
    patchState({
      posts: [...state.posts, payload]
    });
  }


  // Elimina un post del estado
  @Action(RemovePost)
  remove({ getState, patchState }: StateContext<PostsStateModel>, { payload }: RemovePost): void {
    patchState({
      posts: getState().posts.filter(post => post.id !== payload)
    });
  }
}
