import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';

const MAX_URLS = 5;

function UrlShortenerForm() {
  const [urls, setUrls] = useState([{ url: '', alias: '', expire: '' }]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < MAX_URLS) {
      setUrls([...urls, { url: '', alias: '', expire: '' }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation example
    for (let i = 0; i < urls.length; i++) {
      if (!urls[i].url) {
        setError(`URL #${i + 1} is required`);
        return;
      }
      if (urls[i].expire && (isNaN(urls[i].expire) || urls[i].expire > 10)) {
        setError(`Expiration for URL #${i + 1} must be an integer ≤ 10`);
        return;
      }
    }
    setError('');
    // TODO: Submit to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {urls.map((item, idx) => (
          <Grid container item spacing={1} key={idx}>
            <Grid item xs={5}>
              <TextField
                label="Original URL"
                value={item.url}
                onChange={e => handleChange(idx, 'url', e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Custom Alias"
                value={item.alias}
                onChange={e => handleChange(idx, 'alias', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Expiration (min)"
                type="number"
                value={item.expire}
                onChange={e => handleChange(idx, 'expire', e.target.value)}
                fullWidth
                inputProps={{ min: 1, max: 10 }}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={addUrlField}
            disabled={urls.length >= MAX_URLS}
          >
            Add Another URL
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Shorten URLs
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </form>
  );
}

export default UrlShortenerForm;