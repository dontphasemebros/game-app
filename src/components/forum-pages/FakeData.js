module.exports = {
  fakeData: [
    {
      users: [
        {
          id: 1,
          username: 'bob man',
          profile_photo_url: 'https://www.seti.org/sites/default/files/styles/original/public/2019-09/Zork%20alien%20head%20PPR.jpg?itok=T7eTYzCZ',
          age: '40',
        },
        {
          id: 2,
          username: 'bob boy',
          profile_photo_url: 'https://arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/7C26QORMZYI6NOR7KXRFHF323Q.jpg',
          age: '15',
        },
        {
          id: 3,
          username: 'bitter bob',
          profile_photo_url: 'https://studentedgeapplication.azureedge.net/articles/ca774c8d-cbc9-415e-903a-d48d4b6545cc.jpg',
          age: '24',
        },
      ],
      discussions: [
        {
          id_user: 1,
          id_channel: 2,
          updated_at: new Date(),
          created_at: new Date(),
          snippet: 'I have to say, this is by far not the best kind of gameplay I have seen from any genre like this.'
             + 'It could have been done better by a longshot. Anyone agree?',
        },
        {
          id_user: 3,
          id_channel: 2,
          updated_at: new Date(),
          created_at: new Date(),
          title: 'Guys, who wants to join me in a challenge?',
          snippet: 'I have to say, this is by far not the best kind of gameplay I have seen from any genre like this.'
             + 'It could have been done better by a longshot. Anyone agree?',
        },
        {
          id_user: 2,
          id_channel: 2,
          updated_at: new Date(),
          created_at: new Date(),
          title: 'YOYO I just discovered an EASTER EGG',
          snippet: 'I have to say, this is by far not the best kind of gameplay I have seen from any genre like this.'
             + 'It could have been done better by a longshot. Anyone agree?',
        },
        {
          id_user: 1,
          id_channel: 2,
          updated_at: new Date(),
          created_at: new Date(),
          title: 'Try this when you play asteroidsVV',
          snippet: 'I have to say, this is by far not the best kind of gameplay I have seen from any genre like this.'
             + 'It could have been done better by a longshot. Anyone agree?',
        },
      ],
    },
  ],
};
