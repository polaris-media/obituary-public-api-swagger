const obituaries = [
  { id: '1', fullname: 'John Doe', publication_date: '2025-01-07' },
  { id: '2', fullname: 'Jane Doe', publication_date: '2025-01-08' }
];

exports.getObituaries = (req, res) => {

  const { publication_date, page = 1, limit = 10 } = req.query;

  let filteredObituaries = obituaries;

  if (publication_date) {
    filteredObituaries = filteredObituaries.filter(o => o.publication_date === publication_date);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + +limit;
  const paginatedResults = filteredObituaries.slice(startIndex, endIndex);

  res.status(200).json({
    page: +page,
    total_pages: Math.ceil(filteredObituaries.length / limit),
    total_results: filteredObituaries.length,
    results: paginatedResults
  });
};

exports.createObituary = (req, res) => {
  const { fullname, publication_date, content } = req.body;
  if (!fullname || !publication_date || !content) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
  }

  const newObituary = {
    id: String(obituaries.length + 1),
    fullname,
    publication_date,
    content,
    created_by: req.user.client_id,
    created_at: new Date().toISOString()
  };

  obituaries.push(newObituary);
  res.status(201).json(newObituary);
};

exports.updateObituary = (req, res) => {
  const { id } = req.params;
  const { fullname, publication_date } = req.body;

  const obituary = obituaries.find(o => o.id === id);
  if (!obituary) {
    return res.status(404).json({ error: 'Not Found', message: 'Obituary not found' });
  }

  if (fullname) obituary.fullname = fullname;
  if (publication_date) obituary.publication_date = publication_date;

  res.status(200).json(obituary);
};

exports.cancelObituary = (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const obituary = obituaries.find(o => o.id === id);
  if (!obituary) {
    return res.status(404).json({ error: 'Not Found', message: 'Obituary not found' });
  }

  if (obituary.status === 'cancelled') {
    return res.status(400).json({ error: 'Bad Request', message: 'Obituary is already cancelled' });
  }

  obituary.status = 'cancelled';
  obituary.cancelled_date = new Date().toISOString();
  obituary.reason = reason;

  console.log("Cancelled obituary", obituary);

  res.status(200).json({
    id: obituary.id,
    status: obituary.status,
    cancelled_date: obituary.cancelled_date,
    reason: obituary.reason || 'No reason provided'
  });
};