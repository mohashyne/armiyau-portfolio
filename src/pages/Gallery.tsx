import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[16]} 0 ${({ theme }) => theme.spacing[12]};
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.grey[600]};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const VideoCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: ${({ theme }) => theme.colors.grey[100]};
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const VideoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[12]};
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid ${({ theme }) => theme.colors.grey[200]};
    border-top: 4px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

interface VideoFile {
  name: string;
  path: string;
  size: number;
}

const Gallery: React.FC = () => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get video files from the media directory
    const getVideoFiles = () => {
      try {
        // List of video files from the media directory
        const videoFiles = [
          '03d49d6f-fff9-418f-80ad-ea99e5b7c9c2.MP4',
          '13923eba-9213-4f59-89ef-5faf7ebb9f4e.MP4',
          '1f22a2a7-3580-4d70-802a-c89c523b68d2.MP4',
          '2b31e957-8b7a-43fa-9a63-dd1c6ec5be82.MP4',
          '3df39ee9-f359-4915-8637-6b77650f39ea.MP4',
          '3f7954d3-e250-40a3-b9f1-57ff505a0dc8.MP4',
          '4dde7a11-aefc-4daf-b35c-2645d432e278.MP4',
          '55a453c9-69f2-414a-9ff8-637164020977.MP4',
          '597ee271-03cd-4b62-9227-8d08681b57e0.MP4',
          '62c35b59-7ddd-44f7-946a-5c8805229129.MP4',
          '7673194a-fbf2-4eb5-a45e-c3eccb80d252.MP4',
          '7edc7673-02ea-4f3b-91a5-727cd68353f6.MP4',
          '8da75429-295a-49db-a4f5-a717b860742b.MP4',
          '9d2f2809-dcb3-4aa8-8c51-a1eeb56b71fb.MP4',
          'a256fbf4-d110-4eab-b306-5e3b89c6ef64.MP4',
          'cd6836f0-84f7-4d92-9555-cff8e63fe9cd.MP4',
          'dac46d81-207d-4ab5-b46d-163b1ff0847d.MP4',
          'ee052b28-00d3-4427-ac49-66ccfb828ef2.MP4',
          'f0eb7c66-7612-43c3-ab55-802b3a0ccc5e.MP4',
          'fc4b0e76-ddfc-412b-b010-6a4bc418d26e.MP4'
        ];
        
        const videoList = videoFiles.map((filename, index) => ({
          name: `Video ${index + 1}`,
          path: `/assets/media/${filename}`,
          size: 0 // We don't have size info in frontend, but we could add it
        }));
        
        setVideos(videoList);
        setLoading(false);
      } catch (err) {
        setError('Failed to load video gallery');
        setLoading(false);
      }
    };

    getVideoFiles();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <GalleryContainer>
        <Container>
          <LoadingSpinner />
        </Container>
      </GalleryContainer>
    );
  }

  if (error) {
    return (
      <GalleryContainer>
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <Container>
        <Header>
          <Title>Video Gallery</Title>
          <Subtitle>
            Explore my collection of videos showcasing various projects, tutorials, and creative content.
          </Subtitle>
        </Header>
        
        <VideoGrid>
          {videos.map((video, index) => (
            <VideoCard key={index}>
              <VideoWrapper>
                <Video
                  controls
                  preload="metadata"
                  poster={undefined}
                >
                  <source src={video.path} type="video/mp4" />
                  Your browser does not support the video tag.
                </Video>
              </VideoWrapper>
              <VideoInfo>
                <VideoTitle>{video.name}</VideoTitle>
                <VideoMeta>
                  <span>MP4 Format</span>
                  <span>•</span>
                  <span>{formatFileSize(video.size)}</span>
                </VideoMeta>
              </VideoInfo>
            </VideoCard>
          ))}
        </VideoGrid>
      </Container>
    </GalleryContainer>
  );
};

export default Gallery;

