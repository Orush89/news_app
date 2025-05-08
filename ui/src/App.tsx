import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
  Tooltip,
  Chip,
  CircularProgress,
} from '@mui/material';
import { NewsArticle } from './types/news';
import { fetchNews } from './services/api';

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setArticles(data);
      } catch (err) {
        setError('Failed to load news articles');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fake News Generator
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {articles.slice(0, 10).map((article, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Tooltip title={article.url}>
                <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Chip label={article.category} color="primary" size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(article.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                    <Typography variant="h6" gutterBottom>
                      Title: {article.title}
                    </Typography>
                    <Box my={2} sx={{ borderTop: '1px solid #e0e0e0' }} />
                    <Typography variant="h6" gutterBottom>
                      Fake title: {article.fake_title}
                    </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      Source: {article.source}
                    </Typography>
                  </Box>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App; 