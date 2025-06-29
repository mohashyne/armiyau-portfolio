import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[16]} 0 ${({ theme }) => theme.spacing[12]};
  background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 50%, #ff6b35 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Tab = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: ${({ active }) => active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  backdrop-filter: blur(10px);
  font-size: ${({ theme }) => theme.fontSizes.lg};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  ${({ active }) => active && `
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  `}
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  position: relative;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: 800;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  font-weight: 300;
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

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 107, 53, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 107, 53, 1);
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  }

  &::before {
    content: '▶';
    margin-left: 3px;
  }
`;

const VideoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all ${({ theme }) => theme.transitions.base};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: ${({ theme }) => theme.colors.grey[100]};
  overflow: hidden;
  cursor: pointer;

  &:hover ${PlayButton} {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.base};

  ${VideoCard}:hover & {
    transform: scale(1.05);
  }
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
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
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

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

// Modal Styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
`;

const ModalVideo = styled.video`
  width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all ${({ theme }) => theme.transitions.base};
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ModalTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  text-align: center;
`;

interface MediaFile {
  name: string;
  path: string;
  type: 'video' | 'photo';
  size?: number;
}

interface ModalState {
  isOpen: boolean;
  media: MediaFile | null;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [photos, setPhotos] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ isOpen: false, media: null });

  useEffect(() => {
    const getMediaFiles = () => {
      try {
        // List of video files from the media directory with meaningful names
        const videoFiles = [
          { filename: '03d49d6f-fff9-418f-80ad-ea99e5b7c9c2.MP4', title: 'Training Session - Ball Control Drills' },
          { filename: '13923eba-9213-4f59-89ef-5faf7ebb9f4e.MP4', title: 'Match Highlights - Katsina United vs Plateau United' },
          { filename: '1f22a2a7-3580-4d70-802a-c89c523b68d2.MP4', title: 'Skill Development - Passing Accuracy' },
          { filename: '2b31e957-8b7a-43fa-9a63-dd1c6ec5be82.MP4', title: 'Nigeria U-20 Training Camp' },
          { filename: '3df39ee9-f359-4915-8637-6b77650f39ea.MP4', title: 'Pre-Season Fitness Training' },
          { filename: '3f7954d3-e250-40a3-b9f1-57ff505a0dc8.MP4', title: 'Tactical Positioning Practice' },
          { filename: '4dde7a11-aefc-4daf-b35c-2645d432e278.MP4', title: 'Free Kick Techniques' },
          { filename: '55a453c9-69f2-414a-9ff8-637164020977.MP4', title: 'Match Day Preparation' },
          { filename: '597ee271-03cd-4b62-9227-8d08681b57e0.MP4', title: 'Speed and Agility Training' },
          { filename: '62c35b59-7ddd-44f7-946a-5c8805229129.MP4', title: 'Team Building Exercise' },
          { filename: '7673194a-fbf2-4eb5-a45e-c3eccb80d252.MP4', title: 'Goal Scoring Practice' },
          { filename: '7edc7673-02ea-4f3b-91a5-727cd68353f6.MP4', title: 'Defensive Drills' },
          { filename: '8da75429-295a-49db-a4f5-a717b860742b.MP4', title: 'Youth Academy Training' },
          { filename: '9d2f2809-dcb3-4aa8-8c51-a1eeb56b71fb.MP4', title: 'International Match Preparation' },
          { filename: 'a256fbf4-d110-4eab-b306-5e3b89c6ef64.MP4', title: 'Recovery Session' },
          { filename: 'cd6836f0-84f7-4d92-9555-cff8e63fe9cd.MP4', title: 'Technical Skills Workshop' },
          { filename: 'dac46d81-207d-4ab5-b46d-163b1ff0847d.MP4', title: 'Match Analysis Session' },
          { filename: 'ee052b28-00d3-4427-ac49-66ccfb828ef2.MP4', title: 'Strength Training' },
          { filename: 'f0eb7c66-7612-43c3-ab55-802b3a0ccc5e.MP4', title: 'Championship Celebration' },
          { filename: 'fc4b0e76-ddfc-412b-b010-6a4bc418d26e.MP4', title: 'Behind the Scenes - Training Camp' },
          // New videos from U-20 AFCON
          { filename: '0bf0d571-8bf6-4c46-a61b-0989dbf88df7.MP4', title: 'U-20 AFCON - Training Camp Highlights' },
          { filename: '19a00658-2ead-4cce-9fe5-728551567508.MP4', title: 'U-20 AFCON - Pre-Tournament Preparation' },
          { filename: '2766255f-6745-47e0-a437-18f32e98bd57.MP4', title: 'U-20 AFCON - Team Tactical Session' },
          { filename: '31c9240e-5dd8-4878-b8dc-72a2eb959604.MP4', title: 'U-20 AFCON - Match Day Warm-up' },
          { filename: '44ae254f-9c77-4903-9902-f015715d840b.MP4', title: 'U-20 AFCON - Group Stage Performance' },
          { filename: '45c78f92-f460-4c21-8fd2-9b23583a44d1.MP4', title: 'U-20 AFCON - Midfield Dominance' },
          { filename: '4ff35d28-5212-4d4d-ad42-3ca4d1766468.MP4', title: 'U-20 AFCON - Knockout Stage Action' },
          { filename: '5eed8090-2ba5-4106-9287-3ebbc6a8860b.MP4', title: 'U-20 AFCON - Team Chemistry Building' },
          { filename: '87c498c9-6b3d-4d48-bcca-1695cbd99a3c.MP4', title: 'U-20 AFCON - Skills & Techniques Display' },
          { filename: '881af655-172f-46a1-89b7-f1a02e411f50.MP4', title: 'U-20 AFCON - Tournament Highlights' },
          { filename: '9b2b15cf-143c-477b-a6cf-ba8ec697870a.MP4', title: 'U-20 AFCON - Captain Leadership Moments' },
          { filename: '9d505824-1646-49ec-a3f4-eb63ce7fa86f.MP4', title: 'U-20 AFCON - NIG VS EGYPT' },
          { filename: 'f683fb28-57c9-4763-b57d-f708dd3f9d44.MP4', title: 'U-20 AFCON - Tournament Celebration' }
        ];
        
        // List of photo files from the photos directory with meaningful names
        const photoFiles = [
          { filename: '032ba089-2f80-4e4a-8d6d-98f817e8370b.JPG', title: 'Team Photo - Katsina United Squad' },
          { filename: '0c029a8c-a52e-4d29-9fa3-f2b95f99b231.JPG', title: 'Training Ground Action Shot' },
          { filename: '14147ab7-116c-4f08-83e5-ae6906e65846.JPG', title: 'Match Day Preparation' },
          { filename: '3175e89a-115b-4fa1-a194-0a4c744ed818.JPG', title: 'Victory Celebration' },
          { filename: '3f1b9aa9-7128-4f19-98e3-3fb05bda60e9.JPG', title: 'Nigeria U-20 Team Portrait' },
          { filename: '4063c166-aaa5-4905-ad6d-f0918a111208.JPG', title: 'Professional Headshot' },
          { filename: '41606b07-4aad-49f1-9451-9c276ea3a8ea.JPG', title: 'Training Session Focus' },
          { filename: '48504a34-9404-41d8-8ae6-1164bb3f11ee.JPG', title: 'Stadium Action Shot' },
          { filename: '4d4b1a6a-3020-46b1-9406-d941278e8f08.JPG', title: 'Award Ceremony Moment' },
          { filename: '70064237-ccea-4e33-aed3-ce4ace65000d.JPG', title: 'Team Strategy Discussion' },
          { filename: '7dd899d0-2eec-436f-9bf8-bc64ab075c44.JPG', title: 'International Match Moment' },
          { filename: '8158f89a-1dae-4946-8e0b-c9ced4788fb1.JPG', title: 'Skill Demonstration' },
          { filename: '815a496e-cecc-4fee-9f92-646d88b188d6.JPG', title: 'Championship Trophy' },
          { filename: '8d990f35-2565-4455-90fb-f1b87c057329.JPG', title: 'Youth Development Program' },
          { filename: '96c8498d-4012-4072-bfa6-f018308171f3.JPG', title: 'Pre-Match Warm-up' },
          { filename: '99c57a77-185f-4fa9-8723-ace1161b17b0.JPG', title: 'Team Building Activity' },
          { filename: '9fa20b49-05cb-47f7-b614-710daa48522c.JPG', title: 'Training Camp Group Photo' },
          { filename: 'a73350c8-cc33-48ad-b7e7-ca569a942a24.JPG', title: 'Match Performance Highlight' },
          { filename: 'acd6fb77-46f4-487a-bd56-a1b7a45ab671.JPG', title: 'Professional Portfolio Shot' },
          { filename: 'c7f11936-de9d-47f5-9cba-cf6bc544fb5e.JPG', title: 'Stadium Entrance Moment' },
          { filename: 'c7fe9e38-61ec-4305-8132-a6335703cf42.JPG', title: 'Team Captain Leadership' },
          { filename: 'c8356b86-cea6-4283-a6fc-12c9d04fe0a5.JPG', title: 'Training Equipment Setup' },
          { filename: 'c9b6479d-9435-4f2b-aa05-2fb9b3e16e81.JPG', title: 'Match Day Concentration' },
          { filename: 'c9c3ba89-37c0-44a8-ac38-7d403c6f0b7e.JPG', title: 'Victory Lap Celebration' },
          { filename: 'd201296b-e6c1-4eb1-8d9a-44c23e298d43.JPG', title: 'Professional Training Session' },
          { filename: 'f28454b3-9514-48ea-b75f-4a09a1b29622.JPG', title: 'Team Unity Moment' },
          { filename: 'f5460aa0-deeb-4536-a99d-6b97f40f6e64.JPG', title: 'Championship Success' },
          // New photos from U-20 AFCON
          { filename: '0027bbe7-2f31-42a7-9ac9-d2bfaf060e7f.JPG', title: 'U-20 AFCON - Official Tournament Portrait' },
          { filename: '47f871cf-0db0-4092-86a5-7cbc8660b3b2.JPG', title: 'U-20 AFCON - Training Camp Moment' },
          { filename: '7e58f3cd-fd65-4dd6-9215-4d477f9990bd.JPG', title: 'U-20 AFCON - Pre-Match Focus' },
          { filename: 'a343a75a-3297-475d-af6e-06598300abe5.JPG', title: 'U-20 AFCON - Match Action Shot' },
          { filename: 'bb78bbce-6600-4500-9e46-f71731a3c626.JPG', title: 'U-20 AFCON - Team Celebration' },
          { filename: 'd2880682-f7ef-4d2a-b1b9-9ff2e52edd35.JPG', title: 'U-20 AFCON - Tournament Achievement' }
        ];
        
        const videoList = videoFiles.map((video) => ({
          name: video.title,
          path: `/assets/media/${video.filename}`,
          type: 'video' as const,
          size: 0
        }));

        const photoList = photoFiles.map((photo) => ({
          name: photo.title,
          path: `/assets/photos/${photo.filename}`,
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

  const openModal = (media: MediaFile) => {
    setModal({ isOpen: true, media });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal({ isOpen: false, media: null });
    document.body.style.overflow = 'unset';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (modal.isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modal.isOpen]);

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
          <Title>Professional Gallery</Title>
          <Subtitle>
            Discover my journey through football excellence - from U-20 AFCON tournament moments to training sessions and championship celebrations, capturing the dedication and passion that defines my career.
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
                <VideoWrapper onClick={() => openModal(video)}>
                  <Video
                    preload="metadata"
                    poster={undefined}
                    muted
                  >
                    <source src={video.path} type="video/mp4" />
                    Your browser does not support the video tag.
                  </Video>
                  <PlayButton />
                </VideoWrapper>
                <VideoInfo>
                  <VideoTitle>{video.name}</VideoTitle>
                  <VideoMeta>
                    <span>MP4 Format</span>
                    <span>•</span>
                    <span>HD Quality</span>
                  </VideoMeta>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        )}
        
        {activeTab === 'photos' && (
          <PhotoGrid>
            {photos.map((photo, index) => (
              <PhotoCard key={index} onClick={() => openModal(photo)}>
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

      {/* Modal for enlarged view */}
      <AnimatePresence>
        {modal.isOpen && modal.media && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                ×
              </CloseButton>

              {modal.media.type === 'video' ? (
                <ModalVideo
                  controls
                  autoPlay
                  preload="auto"
                  controlsList="nodownload"
                >
                  <source src={modal.media.path} type="video/mp4" />
                  Your browser does not support the video tag.
                </ModalVideo>
              ) : (
                <ModalImage
                  src={modal.media.path}
                  alt={modal.media.name}
                />
              )}

              <ModalTitle>
                {modal.media.name}
              </ModalTitle>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default Gallery;

