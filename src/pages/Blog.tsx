import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BlogPage = styled.div`
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
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: white;
    
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
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

const BlogSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const BlogGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  max-width: 800px;
  margin: 0 auto;
`;

const BlogPost = styled(motion.article)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }
`;

const PostImage = styled.div`
  height: 300px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.base};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const PostContent = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  .date {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.grey[600]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    
    i {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PostTags = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  li {
    a {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
      border-radius: ${({ theme }) => theme.borderRadius.full};
      font-size: ${({ theme }) => theme.fontSizes.xs};
      text-decoration: none;
      transition: all ${({ theme }) => theme.transitions.base};
      
      &:hover {
        background: ${({ theme }) => theme.colors.accent};
      }
    }
  }
`;

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: 1.3;
  
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.base};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.grey[600]};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const ReadMoreButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[12]};
  
  li {
    a, span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: white;
      color: ${({ theme }) => theme.colors.grey[600]};
      text-decoration: none;
      font-weight: 600;
      transition: all ${({ theme }) => theme.transitions.base};
      box-shadow: ${({ theme }) => theme.shadows.sm};
      
      &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
      }
    }
    
    &.active span {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
    
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

const blogPosts = [
  {
    id: 1,
    title: "Poland/Norway Cup Glory: The Tournament That Changed My Career",
    subtitle: "How Winning Abroad Shaped My Mentality and Caught Scouts' Attention",
    excerpt: "Competing in international youth tournaments in Poland and Norway was the turning point in my career. The experience of winning abroad didn't just boost my confidence—it caught the eyes of scouts, sharpened my mentality, and opened doors to new opportunities. From adapting to European playing styles to delivering standout performances under pressure, these tournaments shaped me into a more complete, resilient player.",
    image: "/assets/images/blog/blog1.jpg",
    date: "25 December",
    tags: ["International", "Youth", "Tournament"]
  },
  {
    id: 2,
    title: "The Dream Ahead: Balancing Nigeria U-20 & European Club Aspirations",
    subtitle: "AFCON U-20 2025 Preparations and Transfer Market Ambitions",
    excerpt: "As I prepare for AFCON U-20 2025 with Nigeria's national team, my ambitions extend beyond the tournament. The dream? To compete at the highest level in Europe while continuing to represent my country with pride. Juggling national team duties, off-season training, and growing transfer interest requires discipline, focus, and a clear plan.",
    image: "/assets/images/blog/blog2.jpg",
    date: "20 December",
    tags: ["AFCON", "Nigeria", "Europe"]
  },
  {
    id: 3,
    title: "Katsina United: My Homegrown Journey & Breaking into the First Team",
    subtitle: "From Academy Grind to Professional Debut",
    excerpt: "From kicking dust in local academies to commanding the pitch in NPFL - my rise through Katsina United was anything but ordinary. The same pitches where I once dreamed as a ballboy now witness my first-team battles. Key highlights: Academy grind to pro debut, mentors who shaped my game, and balancing hometown love with bigger dreams.",
    image: "/assets/images/blog/blog7.jpg",
    date: "15 December",
    tags: ["Katsina United", "Academy", "NPFL"]
  },
  {
    id: 4,
    title: "Box-to-Box Midfielder Blueprint: My Style of Play & Role Models",
    subtitle: "11km Per Game Engine Meets Creative Vision",
    excerpt: "11km per game engine meets creative vision - my box-to-box philosophy blends Nigerian grit with European precision. This isn't just playing midfield - it's controlling games with purpose. Discover my positional DNA breakdown, how I study Coutinho & Okocha, and training drills that built my 83% pass accuracy.",
    image: "/assets/images/blog/blog3.jpg",
    date: "10 December",
    tags: ["Tactics", "Midfield", "Training"]
  }
];

const Blog: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <BlogPage>
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1><span>Latest</span> Posts</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><span>Blog</span></li>
          </ul>
        </HeroContent>
      </HeroSection>
      
      <BlogSection ref={ref}>
        <Container>
          <BlogGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {blogPosts.map((post) => (
              <BlogPost key={post.id} variants={itemVariants}>
                <PostImage>
                  <Link to={`/blog/${post.id}`}>
                    <img src={post.image} alt={post.title} />
                  </Link>
                </PostImage>
                <PostContent>
                  <PostMeta>
                    <div className="date">
                      <i className="fas fa-clock" />
                      {post.date}
                    </div>
                  </PostMeta>
                  <PostTags>
                    {post.tags.map((tag, index) => (
                      <li key={index}>
                        <a href="#0">{tag}</a>
                      </li>
                    ))}
                  </PostTags>
                  <PostTitle>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </PostTitle>
                  {post.subtitle && (
                    <PostExcerpt><em>{post.subtitle}</em></PostExcerpt>
                  )}
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  <ReadMoreButton to={`/blog/${post.id}`}>Read More</ReadMoreButton>
                </PostContent>
              </BlogPost>
            ))}
          </BlogGrid>
          
          <Pagination>
            <li className="disabled">
              <span><i className="fas fa-angle-left" /></span>
            </li>
            <li><a href="#0">01</a></li>
            <li className="active"><span>02</span></li>
            <li><a href="#0">03</a></li>
            <li>
              <a href="#0"><i className="fas fa-angle-right" /></a>
            </li>
          </Pagination>
        </Container>
      </BlogSection>
    </BlogPage>
  );
};

export default Blog;

