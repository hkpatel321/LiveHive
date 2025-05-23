import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import '../styles/History.css';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }
        fetchHistory();
    }, []);

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    return (
        <div className="history-container">
            <div className="history-header">
                <IconButton
                    className="home-button"
                    onClick={() => routeTo("/home")}
                >
                    <HomeIcon />
                </IconButton>
                <Typography variant="h4">Meeting History</Typography>
            </div>

            <div className="meetings-grid">
                {meetings.length !== 0 ? (
                    meetings.map((e, i) => (
                        <Card key={i} className="meeting-card">
                            <CardContent className="meeting-content">
                                <Typography className="meeting-code">
                                    Meeting Code: {e.meetingCode}
                                </Typography>
                                <Typography className="meeting-date">
                                    Date: {formatDate(e.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography className="no-meetings">
                        No meeting history available
                    </Typography>
                )}
            </div>
        </div>
    );
}