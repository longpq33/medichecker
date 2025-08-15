import styled from 'styled-components'
import { Card } from 'antd'
import { 
  SPACING, 
  BORDER_RADIUS, 
  COLORS, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  GRADIENTS,
  TRANSITIONS 
} from '@/constants'

export const ContactContainer = styled.div`
  /* padding: ${SPACING.PADDING_XXL}; */
  /* max-width: 1200px; */
  margin: 0 auto;
  
  .ant-breadcrumb {
    margin-bottom: ${SPACING.MARGIN_LG};
  }
  
  @media (max-width: 768px) {
    padding: ${SPACING.PADDING_LG};
  }
`

export const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${SPACING.MARGIN_XXL};
  
  .hero-title {
    background: ${GRADIENTS.PRIMARY};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 3rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-bottom: ${SPACING.MARGIN_LG};
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .hero-subtitle {
    font-size: ${FONT_SIZE.LG};
    color: ${COLORS.TEXT_SECONDARY};
    max-width: 600px;
    margin: 0 auto;
  }
`

export const SlideContent = styled.div<{ color: string }>`
  text-align: center;
  padding: ${SPACING.PADDING_XXL};
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, ${props => props.color}15, ${props => props.color}05);
  border-radius: ${BORDER_RADIUS.LG};
  
  .slide-icon {
    font-size: 4rem;
    color: ${props => props.color};
    margin-bottom: ${SPACING.MARGIN_LG};
    animation: pulse 2s infinite;
  }
  
  .slide-title {
    color: ${props => props.color};
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-bottom: ${SPACING.MARGIN_MD};
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  .slide-description {
    font-size: ${FONT_SIZE.LG};
    color: ${COLORS.TEXT_SECONDARY};
    max-width: 500px;
    line-height: 1.6;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`

export const TeamSection = styled.div`
  margin: ${SPACING.MARGIN_XXL} 0;
  text-align: center;
  
  .section-title {
    background: ${GRADIENTS.PRIMARY};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 2.5rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-bottom: ${SPACING.MARGIN_MD};
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .section-description {
    font-size: ${FONT_SIZE.LG};
    color: ${COLORS.TEXT_SECONDARY};
    max-width: 600px;
    margin: 0 auto ${SPACING.MARGIN_XL};
    line-height: 1.6;
  }
  
  .team-members {
    margin-top: ${SPACING.MARGIN_XL};
  }
`

export const TeamMemberCard = styled(Card)`
  text-align: center;
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: ${TRANSITIONS.NORMAL};
  border: none;
  background: ${COLORS.BG_PRIMARY};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_XL};
  }
  
  .member-avatar {
    margin-bottom: ${SPACING.MARGIN_LG};
    border: 4px solid ${COLORS.PRIMARY};
  }
  
  .member-name {
    color: ${COLORS.TEXT_PRIMARY};
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-bottom: ${SPACING.MARGIN_SM};
  }
  
  .member-role {
    color: ${COLORS.PRIMARY};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    font-size: ${FONT_SIZE.MD};
    display: block;
    margin-bottom: ${SPACING.MARGIN_MD};
  }
  
  .member-description {
    color: ${COLORS.TEXT_SECONDARY};
    margin-bottom: ${SPACING.MARGIN_LG};
    line-height: 1.6;
  }
  
  .member-social {
    display: flex;
    justify-content: center;
    gap: ${SPACING.GAP_MD};
    
    .social-icon {
      font-size: 1.5rem;
      color: ${COLORS.TEXT_SECONDARY};
      transition: ${TRANSITIONS.NORMAL};
      cursor: pointer;
      
      &:hover {
        color: ${COLORS.PRIMARY};
        transform: scale(1.2);
      }
    }
  }
`

export const FeatureCard = styled(Card)`
  text-align: center;
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: ${TRANSITIONS.NORMAL};
  border: none;
  background: ${COLORS.BG_PRIMARY};
  margin-bottom: ${SPACING.MARGIN_LG};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
  
  .feature-icon {
    font-size: 2.5rem;
    color: ${COLORS.PRIMARY};
    margin-bottom: ${SPACING.MARGIN_MD};
  }
  
  .feature-title {
    color: ${COLORS.TEXT_PRIMARY};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    margin-bottom: ${SPACING.MARGIN_SM};
  }
  
  .feature-description {
    color: ${COLORS.TEXT_SECONDARY};
    line-height: 1.6;
  }
`

export const ContactInfo = styled.div`
  margin: ${SPACING.MARGIN_XXL} 0;
  text-align: center;
  
  .section-title {
    background: ${GRADIENTS.PRIMARY};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 2.5rem;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-bottom: ${SPACING.MARGIN_MD};
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .section-description {
    font-size: ${FONT_SIZE.LG};
    color: ${COLORS.TEXT_SECONDARY};
    max-width: 600px;
    margin: 0 auto ${SPACING.MARGIN_XL};
    line-height: 1.6;
  }
  
  .contact-details {
    margin-top: ${SPACING.MARGIN_XL};
  }
  
  .contact-card {
    text-align: center;
    border-radius: ${BORDER_RADIUS.LG};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: ${TRANSITIONS.NORMAL};
    border: none;
    background: ${COLORS.BG_PRIMARY};
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    }
    
    .ant-card-body {
      padding: ${SPACING.PADDING_LG};
    }
    
    .contact-icon {
      font-size: 2rem;
      color: ${COLORS.PRIMARY};
      margin-bottom: ${SPACING.MARGIN_MD};
    }
    
    .ant-typography {
      color: ${COLORS.TEXT_PRIMARY};
      font-weight: ${FONT_WEIGHT.SEMIBOLD};
      margin-bottom: ${SPACING.MARGIN_SM};
    }
    
    p {
      color: ${COLORS.TEXT_SECONDARY};
    }
  }
`

// Additional styles for carousel card
export const CarouselCard = styled(Card)`
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: none;
  margin-bottom: ${SPACING.MARGIN_XL};
  
  .ant-carousel .slick-dots {
    bottom: 20px;
    
    li button {
      background: ${COLORS.PRIMARY};
      opacity: 0.3;
    }
    
    li.slick-active button {
      opacity: 1;
    }
  }
`

// Features section styles
export const FeaturesSection = styled.div`
  margin: ${SPACING.MARGIN_XXL} 0;
  
  .features-section {
    margin-top: ${SPACING.MARGIN_XL};
  }
`
