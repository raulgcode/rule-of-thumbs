import React from 'react';
import thumbsUp from '../assets/img/thumbs-up.svg'
import thumbsDown from '../assets/img/thumbs-down.svg' 
import { useAppContext } from '../context';

const Thumb = ({votes}) => votes.positive >= votes.negative ?  
  (<span className="thumbs-up--wrapper">
    <img src={thumbsUp} alt="thumbs up" /> 
  </span>): 
  (<span className="thumbs-down--wrapper">
    <img src={thumbsDown} alt="thumbs up" />
  </span>)

const RulingCard = ({user}) => {
  const {state, vote, resetVote} = useAppContext()
  const [isDown, setIsDown] = React.useState(false)
  const [isUp, setIsUp] = React.useState(false)
  const gradient = "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(136, 136, 136) -0.21%, rgb(102, 102, 102) 0%, rgba(51, 51, 51, 0.6) 88.88%)"
  
  const onUpSelected = () => {
    setIsDown(false)
    setIsUp(!isUp)
  }
  const onDownSelected = () => {
    setIsDown(!isDown)
    setIsUp(false)
  }

  const onVoteNow = () => {
    if (isDown) {
      user.votes.negative++
    } else {
      user.votes.positive++
    }
    user.votes.total++
    const percentagePositive = parseFloat(
      ((user.votes.positive * 100) / user.votes.total).toFixed(2)
    );
    const percentageNegative = parseFloat(
      ((user.votes.negative * 100) / user.votes.total).toFixed(2)
    );
    user.votes.percentagePositive = percentagePositive
    user.votes.percentageNegative = percentageNegative
    setIsDown(false)
    setIsUp(false)
    vote(user)
    alert("Thank you for your vote!")
  }

  const onVoteAgain = () => {
    resetVote(user)
  }
  
  return (
    <div
      className={`card ${state.view}`}
      style={{ backgroundImage: state.view === 'list'? `${gradient}, url('../assets/img/${user.picture}.png')` : `url('../assets/img/${user.picture}@2x.png')`}}
    >
      <div className={`card--body ${state.view}`}>
        <div className="row">
          <div className="col">
            <Thumb votes={user.votes} />
          </div>
          <div className="col">
            <h2 className="card--title">{user.name}</h2>
            {state.votedUsers.has(user.id) ? (
              <button 
                onClick={onVoteAgain}
                className="button vote-now-btn"
              >
                Vote Again
              </button>
            ) : (
              <>
                <button
                  onClick={onUpSelected}
                  type="button"
                  className={`button thumbs-up-btn ${
                    isUp ? "vote-selected" : ""
                  }`}
                >
                  <img src={thumbsUp} alt="thumbs up" />
                </button>
                <button
                  onClick={onDownSelected}
                  type="button"
                  className={`button thumbs-down-btn ${
                    isDown ? "vote-selected" : ""
                  }`}
                >
                  <img src={thumbsDown} alt="thumbs down" />
                </button>
                <button
                  onClick={onVoteNow}
                  disabled={!isDown && !isUp}
                  className="button vote-now-btn"
                >
                  Vote Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`card--footer ${state.view}`}>
        <div className="gauge-bar-wrapper">
          <span
            style={{ width: `${user.votes.percentagePositive}%` }}
            className="gauge-bar positive-bar"
          >
            {user.votes.percentagePositive}%
          </span>
          <span
            style={{ width: `${user.votes.percentageNegative}%` }}
            className="gauge-bar negative-bar"
          >
            {user.votes.percentageNegative}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default RulingCard