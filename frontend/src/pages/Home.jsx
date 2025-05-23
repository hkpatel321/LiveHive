import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Home.css';

function Home() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <div className="home-container">
            <div className="navBar">
                <div>
                    <h2>Live Hive Video Call</h2>
                </div>
                
                <div className="nav-right">
                    <div className="history-button" onClick={() => navigate("/history")}>
                        <IconButton>
                            <RestoreIcon />
                        </IconButton>
                        <span>History</span>
                    </div>

                    <Button
                        className="logout-button"
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <h2>Providing Quality Video Call Just Like Quality Education</h2>
                    <div className="join-meeting-container">
                        <span className="meeting-code-label">Meeting Code</span>                        <TextField
                            className="meeting-code-input"
                            onChange={e => setMeetingCode(e.target.value)}
                            variant="outlined"
                            placeholder="Enter meeting code"
                            sx={{
                                width: '300px',
                                '& .MuiOutlinedInput-root': {
                                    height: '50px',
                                    fontSize: '1.1rem'
                                }
                            }}
                        />
                        <Button
                            className="join-button"
                            onClick={handleJoinVideoCall}
                            variant="contained"
                            sx={{
                                minWidth: '120px',
                                height: '50px'
                            }}
                        >
                            Join
                        </Button>
                    </div>
                </div>
                <div className="rightPanel">
                    <img src="/logo3.png" alt="LiveHive Video Call" />
                </div>
            </div>
        </div>
    )
}

export default withAuth(Home)