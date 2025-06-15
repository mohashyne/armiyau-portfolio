import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BlogSinglePage = styled.div`
  padding-top: 0;
`;

const HeroSection = styled.section`
  min-height: 60vh;
  background: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)
  ), url('/assets/images/banner/banner-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled(motion.div)`
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: white;
    line-height: 1.2;
    max-width: 800px;
  }
  
  .breadcrumb {
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[2]};
    align-items: center;
    margin-top: ${({ theme }) => theme.spacing[4]};
    
    li {
      color: rgba(255, 255, 255, 0.8);
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
      
      &:not(:last-child)::after {
        content: '/';
        margin-left: ${({ theme }) => theme.spacing[2]};
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

const ArticleSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const Article = styled(motion.article)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const ArticleImage = styled.div`
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArticleContent = styled.div`
  padding: ${({ theme }) => theme.spacing[12]};
  
  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
  
  .subtitle {
    font-style: italic;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
  
  p {
    color: ${({ theme }) => theme.colors.grey[600]};
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.base};
  margin-top: ${({ theme }) => theme.spacing[8]};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const blogPosts = {
  '1': {
    title: "Poland/Norway Cup Glory: The Tournament That Changed My Career",
    subtitle: "How Winning Abroad Shaped My Mentality and Caught Scouts' Attention",
    image: "/assets/images/blog/blog1.jpg",
    content: `
      Competing in international youth tournaments in Poland and Norway was the turning point in my career. The experience of winning abroad didn't just boost my confidence—it caught the eyes of scouts, sharpened my mentality, and opened doors to new opportunities.
      
      From adapting to European playing styles to delivering standout performances under pressure, these tournaments shaped me into a more complete, resilient player. The level of competition was unlike anything I'd experienced in Nigeria, with faster-paced games and more tactical discipline required.
      
      Winning these tournaments taught me that talent alone isn't enough—you need mental fortitude, adaptability, and the ability to perform when it matters most. These lessons have stayed with me throughout my professional career and continue to drive my ambitions to play in Europe.
      
      The recognition from scouts following these victories opened doors to national team call-ups and increased interest from European clubs. It showed me that consistent performance on the international stage is crucial for any player with global ambitions.
    `
  },
  '2': {
    title: "The Dream Ahead: Balancing Nigeria U-20 & European Club Aspirations",
    subtitle: "AFCON U-20 2025 Preparations and Transfer Market Ambitions",
    image: "/assets/images/blog/blog2.jpg",
    content: `
      As I prepare for AFCON U-20 2025 with Nigeria's national team, my ambitions extend beyond the tournament. The dream? To compete at the highest level in Europe while continuing to represent my country with pride.
      
      Juggling national team duties, off-season training, and growing transfer interest requires discipline, focus, and a clear plan. Every training session is an opportunity to improve, every match a chance to showcase my abilities to scouts watching from around the world.
      
      AFCON U-20 represents more than just a tournament—it's a platform to demonstrate that Nigerian youth football is producing world-class talent. The tournament will be closely watched by European scouts, making it crucial to deliver standout performances.
      
      My goal is to help Nigeria succeed while positioning myself for the next step in my career. The balance between representing my country and pursuing personal ambitions drives me to be better every day.
    `
  },
  '3': {
    title: "Katsina United: My Homegrown Journey & Breaking into the First Team",
    subtitle: "From Academy Grind to Professional Debut",
    image: "/assets/images/blog/blog7.jpg",
    content: `
      From kicking dust in local academies to commanding the pitch in NPFL - my rise through Katsina United was anything but ordinary. The same pitches where I once dreamed as a ballboy now witness my first-team battles.
      
      The academy grind was tough but essential. Waking up at 5 AM for training, balancing school with football, and pushing through moments of doubt shaped my character. The mentors who guided me during those formative years instilled values that go beyond football—discipline, respect, and the importance of giving back to the community.
      
      Breaking into the first team wasn't guaranteed despite my academy success. I had to prove myself against experienced professionals, adapt to the physical demands of senior football, and show that I could handle the pressure of representing my hometown club.
      
      Now, as an established first-team player, I never forget where I came from. Katsina United will always be home, but my dreams extend to the biggest stages in world football. The foundation built here will support whatever comes next in my career.
    `
  },
  '4': {
    title: "Box-to-Box Midfielder Blueprint: My Style of Play & Role Models",
    subtitle: "11km Per Game Engine Meets Creative Vision",
    image: "/assets/images/blog/blog3.jpg",
    content: `
      11km per game engine meets creative vision - my box-to-box philosophy blends Nigerian grit with European precision. This isn't just playing midfield - it's controlling games with purpose.
      
      My positional DNA combines the work rate of N'Golo Kanté with the creativity of Philippe Coutinho. I study how these players read the game, their positioning, and their decision-making under pressure. Jay-Jay Okocha remains my biggest inspiration—his ability to create magic while maintaining tactical discipline is something I strive to emulate.
      
      Training drills that built my 83% pass accuracy include cone work for close control, wall passes for quick thinking, and long-range passing exercises to expand my distribution range. Physical conditioning focuses on both explosive power for sprints and endurance for covering ground throughout the match.
      
      The modern game demands midfielders who can do everything—defend, create, score, and lead. I'm constantly working to improve each aspect of my game, knowing that versatility is key to success at the highest levels of football.
    `
  }
};

const BlogSingle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[id as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <BlogSinglePage>
        <ArticleSection>
          <Container>
            <Article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ArticleContent>
                <h2>Post Not Found</h2>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <BackButton to="/blog">
                  <i className="fas fa-arrow-left" />
                  Back to Blog
                </BackButton>
              </ArticleContent>
            </Article>
          </Container>
        </ArticleSection>
      </BlogSinglePage>
    );
  }

  return (
    <BlogSinglePage>
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>{post.title}</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><span>Article</span></li>
          </ul>
        </HeroContent>
      </HeroSection>
      
      <ArticleSection>
        <Container>
          <Article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ArticleImage>
              <img src={post.image} alt={post.title} />
            </ArticleImage>
            <ArticleContent>
              <h2>{post.title}</h2>
              <p className="subtitle">{post.subtitle}</p>
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
              <BackButton to="/blog">
                <i className="fas fa-arrow-left" />
                Back to Blog
              </BackButton>
            </ArticleContent>
          </Article>
        </Container>
      </ArticleSection>
    </BlogSinglePage>
  );
};

export default BlogSingle;

