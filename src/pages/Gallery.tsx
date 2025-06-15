import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[16]} 0 ${({ theme }) => theme.spacing[12]};
  background: ${({ theme }) => theme.colors.background};
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Tab = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
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

// Photo Grid Styles
const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const PhotoCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: ${({ theme }) => theme.colors.grey[100]};
  overflow: hidden;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.base};
  
  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

const PhotoInfo = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
`;

const PhotoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const PhotoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

interface MediaFile {
  name: string;
  path: string;
  type: 'video' | 'photo';
  size?: number;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [photos, setPhotos] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMediaFiles = () => {
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
        
        // List of photo files from the photos directory (excluding non-photo files)
        const photoFiles = [
          '032ba089-2f80-4e4a-8d6d-98f817e8370b.JPG',
          '0c029a8c-a52e-4d29-9fa3-f2b95f99b231.JPG',
          '14147ab7-116c-4f08-83e5-ae6906e65846.JPG',
          '3175e89a-115b-4fa1-a194-0a4c744ed818.JPG',
          '3f1b9aa9-7128-4f19-98e3-3fb05bda60e9.JPG',
          '4063c166-aaa5-4905-ad6d-f0918a111208.JPG',
          '41606b07-4aad-49f1-9451-9c276ea3a8ea.JPG',
          '48504a34-9404-41d8-8ae6-1164bb3f11ee.JPG',
          '4d4b1a6a-3020-46b1-9406-d941278e8f08.JPG',
          '70064237-ccea-4e33-aed3-ce4ace65000d.JPG',
          '7dd899d0-2eec-436f-9bf8-bc64ab075c44.JPG',
          '8158f89a-1dae-4946-8e0b-c9ced4788fb1.JPG',
          '815a496e-cecc-4fee-9f92-646d88b188d6.JPG',
          '8d990f35-2565-4455-90fb-f1b87c057329.JPG',
          '96c8498d-4012-4072-bfa6-f018308171f3.JPG',
          '99c57a77-185f-4fa9-8723-ace1161b17b0.JPG',
          '9fa20b49-05cb-47f7-b614-710daa48522c.JPG',
          'a73350c8-cc33-48ad-b7e7-ca569a942a24.JPG',
          'acd6fb77-46f4-487a-bd56-a1b7a45ab671.JPG',
          'c7f11936-de9d-47f5-9cba-cf6bc544fb5e.JPG',
          'c7fe9e38-61ec-4305-8132-a6335703cf42.JPG',
          'c8356b86-cea6-4283-a6fc-12c9d04fe0a5.JPG',
          'c9b6479d-9435-4f2b-aa05-2fb9b3e16e81.JPG',
          'c9c3ba89-37c0-44a8-ac38-7d403c6f0b7e.JPG',
          'd201296b-e6c1-4eb1-8d9a-44c23e298d43.JPG',
          'f28454b3-9514-48ea-b75f-4a09a1b29622.JPG',
          'f5460aa0-deeb-4536-a99d-6b97f40f6e64.JPG'
        ];
        
        const videoList = videoFiles.map((filename, index) => ({
          name: `Video ${index + 1}`,
          path: `/assets/media/${filename}`,
          type: 'video' as const,
          size: 0
        }));
        
        const photoList = photoFiles.map((filename, index) => ({
          name: `Photo ${index + 1}`,
          path: `/assets/photos/${filename}`,
          type: 'photo' as const
        }));
        
        setVideos(videoList);
        setPhotos(photoList);
        setLoading(false);
      } catch (err) {
        setError('Failed to load gallery');
        setLoading(false);
      }
    };

    getMediaFiles();
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
          <Title>Media Gallery</Title>
          <Subtitle>
            Explore my collection of videos and photos showcasing various projects, tutorials, and creative content.
          </Subtitle>
        </Header>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'videos'} 
            onClick={() => setActiveTab('videos')}
          >
            Videos ({videos.length})
          </Tab>
          <Tab 
            active={activeTab === 'photos'} 
            onClick={() => setActiveTab('photos')}
          >
            Photos ({photos.length})
          </Tab>
        </TabContainer>
        
        {activeTab === 'videos' && (
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
                    <span>{formatFileSize(video.size || 0)}</span>
                  </VideoMeta>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        )}
        
        {activeTab === 'photos' && (
          <PhotoGrid>
            {photos.map((photo, index) => (
              <PhotoCard key={index}>
                <PhotoWrapper>
                  <Photo
                    src={photo.path}
                    alt={photo.name}
                    loading="lazy"
                  />
                </PhotoWrapper>
                <PhotoInfo>
                  <PhotoTitle>{photo.name}</PhotoTitle>
                  <PhotoMeta>
                    <span>JPG Format</span>
                    <span>•</span>
                    <span>High Quality</span>
                  </PhotoMeta>
                </PhotoInfo>
              </PhotoCard>
            ))}
          </PhotoGrid>
        )}
      </Container>
    </GalleryContainer>
  );
};

export default Gallery;

