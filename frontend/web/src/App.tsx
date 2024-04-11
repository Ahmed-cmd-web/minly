import './App.css'
import FeedPage from './Pages/FeedPage'
import { getPosts } from './api/posts'
function App() {
  getPosts()

  return (
    <div className='App'>
      <FeedPage />
    </div>
  )
}

export default App
