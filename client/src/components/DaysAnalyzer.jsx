import React, { useEffect, useState } from 'react'

const DaysAnalyzer = () => {
    const [ratings, setRatings] = useState([]);
    useEffect(() => {
        const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];
        const today = new Date();
        // Filter ratings for last 7 days
        const last7DaysRatings = storedRatings.filter(rating => {
            const ratingDate = new Date(rating.date);
            const diffDays = Math.floor((today - ratingDate) / (1000 * 60 * 60 * 24));
            return diffDays >= 0 && diffDays <= 6; // 0 = aaj, 6 = 6 din pehle
        }).map(rating => {
            // Format date for display
            const date = new Date(rating.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            return {
                ...rating,
                date: formattedDate
            };
        });
        setRatings(last7DaysRatings);
    }, []);

    const getPerformanceText = (ratings) => {
        if (ratings.length === 0) return 'No performance data available.';
        const score = ratings.reduce((acc, curr) => {
            if (curr.rating === 'Excellent') return acc + 1;
            if (curr.rating === 'Good') return acc + 0.75;
            if (curr.rating === 'Average') return acc + 0.5;
            return acc + 0.25;
        }, 0) / ratings.length * 100;
        let label = '';
        if (score >= 75) label = 'Good';
        else if (score >= 50) label = 'Average';
        else label = 'Poor';
        return `Your overall performance is ${score.toFixed(2)}% (${label})`;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
            <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow p-8">
                <h1 className="text-3xl font-extrabold mb-6 text-blue-400 text-center">Days Performance Analyzer</h1>
                {ratings.length > 0 ? (
                    <ul className="space-y-3 mb-6">
                        {ratings.map((rating, index) => (
                            <li key={index} className="bg-gray-700 rounded px-4 py-2 flex justify-between items-center">
                                <span className="text-gray-300 font-semibold">{rating.date}</span>
                                <span className={
                                    rating.rating === 'Excellent' ? "text-green-400 font-bold" :
                                    rating.rating === 'Good' ? "text-blue-400 font-bold" :
                                    rating.rating === 'Average' ? "text-yellow-400 font-bold" :
                                    "text-red-400 font-bold"
                                }>
                                    {rating.rating}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-red-400 mb-6">No ratings available for the last 7 days.</p>
                )}
                <h2 className="text-xl font-bold mb-2 text-yellow-400 text-center">Overall Performance</h2>
                <p className="text-center text-gray-200">{getPerformanceText(ratings)}</p>
            </div>
        </div>
    )
}

export default DaysAnalyzer