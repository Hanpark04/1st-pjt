const HOST = 'http://localhost:8000/api/v1/'

const ACCOUNTS = 'accounts/'
const MOVIES = 'movies/'
const ARTICLES = 'articles/'
export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    password: () => HOST + ACCOUNTS + 'password/change/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    profile: (username) => HOST + ACCOUNTS + 'profile/' + username,
    follow: (username) => HOST + ACCOUNTS + username + '/follow/',
    getfollow: (username) => HOST + ACCOUNTS + username + '/getfollow/',
  },
  movies: {
    movielist: () => HOST + MOVIES,
    movielike: (movie_id) => HOST + MOVIES + movie_id + '/like/',
    getlike: (movie_id) => HOST + MOVIES + movie_id + '/getlike/',
    onlygetlike: (movie_id) => HOST + MOVIES + movie_id + '/onlygetlike/',
    recommend: () => HOST + MOVIES + 'recommend/',
    search: () => HOST + MOVIES + 'search/',
  },
  articles: {
    articlelist: (movie_id) => HOST + ARTICLES + movie_id,
    articlecreate: (movie_id) => HOST + ARTICLES + movie_id + '/create/',
    articleupdate: (article_id) => HOST + ARTICLES + article_id + '/update/',
    articledelete: (article_id) => HOST + ARTICLES + article_id + '/delete/',
    articledetail: (article_id) => HOST + ARTICLES + article_id + '/detail/',
    commentcreate: (article_id) => HOST + ARTICLES + article_id + '/commentcreate/',
    commentdelete: (comment_id) => HOST + ARTICLES + comment_id + '/commentdelete/',
  }
}