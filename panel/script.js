const electionResults = [
    {
      candidate: 'Superaktif',
      photo: 'candidate1.png',
      party: {
        name: 'LDP-TBP İttifakı',
        logo: 'partyA.png',
      },
      votes: 0,
    },
    {
      candidate: 'MrKravat',
      photo: 'candidate2.png',
      party: {
        name: 'Genç Parti-FTP İttifakı',
        logo: 'partyB.png',
      },
      votes: 0,
    },
    {
      candidate: 'ibrh',
      photo: 'candidate3.png',
      party: {
        name: 'CTP',
        logo: 'partyC.png',
      },
      votes: 0,
    },
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    generateCandidateList();
    generateChart();
  });
  
  function generateCandidateList() {
    const candidateList = document.getElementById('candidate-list');
  
    electionResults.forEach((result, index) => {
      const listItem = document.createElement('div');
      listItem.className = 'candidate-item';
  
      const candidateImage = document.createElement('img');
      candidateImage.src = result.photo;
      candidateImage.alt = result.candidate;
      candidateImage.className = 'candidate-image';
      listItem.appendChild(candidateImage);
  
      const candidateName = document.createElement('h3');
      candidateName.textContent = result.candidate;
      candidateName.className = 'candidate-name';
      listItem.appendChild(candidateName);
  
      const voteCount = document.createElement('p');
      voteCount.className = 'vote-count';
      listItem.appendChild(voteCount);
  
      const votePercentage = document.createElement('p');
      votePercentage.className = 'vote-percentage';
      listItem.appendChild(votePercentage);
  
      const candidateInfo = document.createElement('div');
      candidateInfo.className = 'candidate-info';
      listItem.appendChild(candidateInfo);
  
      const partyLogo = document.createElement('img');
      partyLogo.src = result.party.logo;
      partyLogo.alt = result.party.name;
      partyLogo.className = 'party-logo';
      candidateInfo.appendChild(partyLogo);
  
      const partyName = document.createElement('p');
      partyName.textContent = result.party.name;
      partyName.className = 'candidate-party';
      candidateInfo.appendChild(partyName);
  
      listItem.addEventListener('mouseover', () => {
        candidateInfo.classList.add('show');
      });
  
      listItem.addEventListener('mouseout', (event) => {
        if (!listItem.contains(event.relatedTarget)) {
          candidateInfo.classList.remove('show');
        }
      });
  
      candidateList.appendChild(listItem);
  
      function updateVoteCount() {
        const currentVotes = parseInt(voteCount.textContent, 10) || 0;
        const targetVotes = result.votes;
  
        let increment = 0;
  
        const updateInterval = setInterval(() => {
          if (increment >= targetVotes) {
            clearInterval(updateInterval);
            voteCount.textContent = targetVotes;
          } else {
            increment += Math.ceil(targetVotes / 50);
            voteCount.textContent = increment;
          }
        }, 50);
      }
  
      function updateVotePercentage() {
        const totalVotes = electionResults.reduce((sum, result) => sum + result.votes, 0);
        const percentage = ((result.votes / totalVotes) * 100).toFixed(2);
        votePercentage.textContent = `Vote Percentage: ${percentage}%`;
      }
  
      updateVoteCount();
      updateVotePercentage();
    });
  }
  
  function generateChart() {
    const chartCanvas = document.getElementById('chart');
    const chartContext = chartCanvas.getContext('2d');
  
    const labels = electionResults.map((result) => result.candidate);
    const votes = electionResults.map((result) => result.votes);
  
    new Chart(chartContext, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: votes,
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
          },
        ],
      },
    });
  }
  