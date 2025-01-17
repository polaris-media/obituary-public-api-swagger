const samplePublications = [
  {
    id: "12345",
    domain: "avis1.no",
    name: "Avis 1",
    mediaRelations: [
      {
        id: "67890",
        domain: "avis2.no",
        name: "Avis 2"
      },
      {
        id: "11223",
        domain: "avis3.no",
        name: "Avis 3"
      }
    ]
  },
  {
    id: "54321",
    domain: "avis4.no",
    name: "Avis 4",
    mediaRelations: []
  }
];

exports.getPublications = (req, res) => {
  res.status(200).json(samplePublications);
};