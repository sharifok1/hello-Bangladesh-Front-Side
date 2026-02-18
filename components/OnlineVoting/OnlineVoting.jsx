import { useState, useEffect } from 'react';
import api from '@/lib/api';
import TrnBanNum from '../TrnBanNum/TrnBanNum';

const OnlinePoll = () => {
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState({});
  const [yesVote, setYesvote] = useState(0);
  const [noVote, setNovote] = useState(0);
  const [noComment, setNocomment] = useState(0);
  const [mounted, setMounted] = useState(false);

  const optionLabels = {
    yes: 'হ্যাঁ',
    no: 'না',
    no_comment: 'মতামত নেই'
  };

  /* ---------------- Fetch Active Poll ---------------- */
  useEffect(() => {
    setMounted(true);
    api.get('/active-vote-question')
      .then(res => {
        const data = res.data.question; // backend returns { question: {...} }
        setPollData(data);

        const voted = localStorage.getItem(`voted_${data.id}`);
        if (voted || res.data.user_has_voted) {
          setHasVoted(true);
          fetchResults(data.id);
        }
      })
      .catch(err => console.error('Error fetching poll:', err))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- Fetch Results ---------------- */
  const fetchResults = (questionId) => {
    api.get(`/vote-results/${questionId}`)
      .then(res => {
        const data = res.data.results;
        setResults(data);

        setYesvote(data?.yes?.count || 0);
        setNovote(data?.no?.count || 0);
        setNocomment(data?.no_comment?.count || 0);
      })
      .catch(err => console.error('Error fetching results:', err));
  };

  /* ---------------- Submit Vote ---------------- */
  const handleVoteSubmit = () => {
    if (!selectedOption || !pollData) return;

    api.post('/submit-vote', {
      question_id: pollData.id,
      vote_option: selectedOption // must be yes, no, or no_comment
    })
      .then(res => {
        localStorage.setItem(`voted_${pollData.id}`, 'true');
        setHasVoted(true);
        fetchResults(pollData.id);
        alert(res.data.message || 'ভোট দেওয়া হয়েছে! ধন্যবাদ।');
      })
      .catch(err => {
        console.error('Vote submission error:', err.response?.data);
        alert(err.response?.data.message || 'ভোট জমা দেওয়া যায়নি। আবার চেষ্টা করুন।');
      });
  };

  /* ---------------- Loading ---------------- */
  if (loading || !mounted) {
    return (
      <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200 animate-pulse">
        <div className="h-4 bg-blue-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-8 bg-blue-100 rounded"></div>
          <div className="h-8 bg-blue-100 rounded"></div>
          <div className="h-8 bg-blue-100 rounded"></div>
        </div>
      </div>
    );
  }

  /* ---------------- No Poll ---------------- */
  if (!pollData) {
    return (
      <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-700 mb-2">অনলাইন জরিপ</h3>
        <p className="text-gray-600">বর্তমানে কোন সক্রিয় জরিপ নেই।</p>
      </div>
    );
  }

  const { question_text, total_votes } = pollData;

  return (
    <div key={pollData?.id || 'poll'} suppressHydrationWarning>
      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-4 border-b pb-2 bg-blue-950 pt-3 mx-auto text-center">অনলাইন জরিপ</h3>
      {/* Question */}
      <p className="text-gray-700 text-lg font-medium mb-6">{question_text}</p>

      {/* Voting Options */}
      {!hasVoted ? (
        <div className="space-y-4 mb-6">
          {Object.keys(optionLabels).map((option, index) => (
            <div
              key={index+1}
              onClick={() => setSelectedOption(option)}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                selectedOption === option
                  ? 'bg-blue-100 border-blue-400'
                  : 'bg-white border-gray-300 hover:bg-blue-50'
              }`}
            >
              <div
                className={`w-5 h-5 mr-3 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option ? 'border-blue-600' : 'border-gray-400'
                }`}
              >
                {selectedOption === option && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
              </div>
              <span className="text-gray-700">{optionLabels[option]}</span>
            </div>
          ))}
        </div>
      ) : (
        // Show Results
        <div className="space-y-4 mb-6">
          {Object.keys(optionLabels).map((option, index) => {
            const count = results[option]?.count || 0; 
            const percent = results[option]?.percentage || 0;

            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1 ">
                  <span>{optionLabels[option]}</span>
                  <span>{TrnBanNum(percent)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded ${
                      option === 'yes' ? 'bg-green-500'
                      : option === 'no' ? 'bg-red-500'
                      : 'bg-gray-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="text-xs text-right text-gray-500">{TrnBanNum(count)} ভোট</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t items-center mx-auto text-center ">
        <div className="text-lg text-gray-600 bg-white py-2 rounded-lg">
          মোট ভোটঃ <strong>{TrnBanNum(results?.total_votes || total_votes || 0)}</strong>
        </div>
        {!hasVoted ? (
        <div>
          <button 
            onClick={handleVoteSubmit}
            disabled={!selectedOption}
            className={`px-6 mt-2 py-2 rounded-lg font-medium text-white transition w-full bg-red-500 ${
              selectedOption
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            ভোট দিন
          </button>
          </div>
         ) : (
          <div className="rounded-lg text-large font-medium bg-red-500 py-2 text-white mt-2">✓ আপনি ইতিমধ্যে ভোট দিয়েছেন</div>
         )}
      </div>
    </div>
  );
};

/* ---------------- Wrapper ---------------- */
const OnlineVoting = () => <OnlinePoll />;

export default OnlineVoting;