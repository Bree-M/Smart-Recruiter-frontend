// src/pages/recruiter/CreateAssessment.jsx

import React, { useState } from 'react';

const CreateAssessment = () => {
    const [assessmentTitle, setAssessmentTitle] = useState('');
    const [assessmentDescription, setAssessmentDescription] = useState('');
    const [questions, setQuestions] = useState([]); // To store an array of question objects

    // Function to handle adding a new question (we'll flesh this out later)
    const addQuestion = (type) => {
        // For now, just log the type and add a placeholder to the questions array
        console.log(`Adding a new ${type} question`);
        setQuestions(prevQuestions => [
            ...prevQuestions,
            { id: Date.now(), type: type, content: '', options: [], answer: '' } // Basic structure for a new question
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('--- Assessment Data ---');
        console.log('Title:', assessmentTitle);
        console.log('Description:', assessmentDescription);
        console.log('Questions:', questions);
        console.log('-----------------------');
        // Later: Send this data to the backend using an API call (e.g., fetch or Axios)
        alert('Assessment form submitted! Check console for data. (No backend integration yet)');
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Assessment</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="assessmentTitle" className="block text-gray-700 text-sm font-bold mb-2">
                        Assessment Title:
                    </label>
                    <input
                        type="text"
                        id="assessmentTitle"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={assessmentTitle}
                        onChange={(e) => setAssessmentTitle(e.target.value)}
                        placeholder="e.g., Junior React Developer Interview"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="assessmentDescription" className="block text-gray-700 text-sm font-bold mb-2">
                        Description:
                    </label>
                    <textarea
                        id="assessmentDescription"
                        rows="4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={assessmentDescription}
                        onChange={(e) => setAssessmentDescription(e.target.value)}
                        placeholder="Provide a brief description of this assessment..."
                    ></textarea>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Questions</h2>

                {/* Section to display added questions */}
                {questions.length === 0 ? (
                    <p className="text-gray-600 mb-4">No questions added yet. Add your first question!</p>
                ) : (
                    <div className="space-y-4 mb-4">
                        {questions.map((q, index) => (
                            <div key={q.id} className="border p-4 rounded-md bg-gray-50 flex justify-between items-center">
                                <p>Question {index + 1}: <span className="font-semibold">{q.type}</span></p>
                                {/* Later: Add a "Remove" button or "Edit" button here */}
                            </div>
                        ))}
                    </div>
                )}


                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Add New Question:
                    </label>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => addQuestion('MCQ')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add MCQ
                        </button>
                        <button
                            type="button"
                            onClick={() => addQuestion('Subjective')}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Subjective
                        </button>
                        <button
                            type="button"
                            onClick={() => addQuestion('Coding')}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Coding
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline text-lg"
                >
                    Create Assessment
                </button>
            </form>
        </div>
    );
};

export default CreateAssessment;