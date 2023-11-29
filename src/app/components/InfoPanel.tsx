/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const InfoPanel = () => {
    return (
        <div className="info-panel">
            <h1>DanGPT</h1>
            <div className="info-section">
                <div className="info-column">
                    <h2>Coding Mysteries Solved</h2>
                    <ul>
                        <li>Demystifying REST APIs and server communication</li>
                        <li>Generating fun project ideas for code newbies</li>
                        <li>Breaking down JavaScript promises and async/await</li>
                    </ul>
                </div>
                <div className="info-column">
                    <h2>Web Wizardry Skills</h2>
                    <ul>
                        <li>Keeping context in check like a session cookie</li>
                        <li>Iterative learning – correct me, I'll refine my code!</li>
                        <li>Writing clean, responsible code that keeps it professional</li>
                    </ul>
                </div>
                <div className="info-column">
                    <h2>Debugging DanGPT</h2>
                    <ul>
                        <li>Occasional logic errors – but hey, who doesn’t?</li>
                        <li>Staying away from scripts that could run amok</li>
                        <li>While my calendar's stuck at 2021, my coding advice is timeless!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;
