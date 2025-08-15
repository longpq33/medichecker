import React from 'react'
import { Card, Carousel, Avatar, Row, Col, Typography } from 'antd'
import { 
  TeamOutlined, 
  HeartOutlined, 
  SafetyOutlined, 
  RocketOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useLanguage } from '../../hooks/useLanguage'
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb'
import {
  ContactContainer,
  HeroSection,
  SlideContent,
  TeamSection,
  TeamMemberCard,
  FeatureCard,
  ContactInfo
} from './styled'

const { Title, Paragraph, Text } = Typography

export const ContactPage: React.FC = () => {
  const { t } = useLanguage()

  const slides = [
    {
      icon: <HeartOutlined />,
      title: t('contact.slide1.title'),
      description: t('contact.slide1.description'),
      color: '#ff6b6b'
    },
    {
      icon: <SafetyOutlined />,
      title: t('contact.slide2.title'),
      description: t('contact.slide2.description'),
      color: '#4ecdc4'
    },
    {
      icon: <RocketOutlined />,
      title: t('contact.slide3.title'),
      description: t('contact.slide3.description'),
      color: '#45b7d1'
    },
    {
      icon: <TeamOutlined />,
      title: t('contact.slide4.title'),
      description: t('contact.slide4.description'),
      color: '#96ceb4'
    }
  ]

  const teamMembers = [
    {
      name: 'Cuong NT',
      role: t('contact.team.role1'),
      github: 'https://github.com/cuongnt',
      linkedin: 'https://linkedin.com/in/cuongnt',
      email: 'cuongnt@example.com',
      description: t('contact.team.member1Desc')
    },
    {
      name: 'Long PQ',
      role: t('contact.team.role2'),
      github: 'https://github.com/longpq2',
      linkedin: 'https://linkedin.com/in/longpq2',
      email: 'longpq2@example.com',
      description: t('contact.team.member2Desc')
    },
    {
      name: 'Tuyen TV',
      role: t('contact.team.role3'),
      github: 'https://github.com/tuyentv19',
      linkedin: 'https://linkedin.com/in/tuyentv19',
      email: 'tuyentv19@example.com',
      description: t('contact.team.member3Desc')
    }
  ]

  const features = [
    {
      icon: <HeartOutlined />,
      title: t('contact.features.feature1.title'),
      description: t('contact.features.feature1.description')
    },
    {
      icon: <SafetyOutlined />,
      title: t('contact.features.feature2.title'),
      description: t('contact.features.feature2.description')
    },
    {
      icon: <RocketOutlined />,
      title: t('contact.features.feature3.title'),
      description: t('contact.features.feature3.description')
    },
    {
      icon: <TeamOutlined />,
      title: t('contact.features.feature4.title'),
      description: t('contact.features.feature4.description')
    }
  ]

  return (
    <ContactContainer>
      <Breadcrumb 
        items={[
          {
            title: t('navigation.contact'),
            path: '/contact'
          }
        ]}
        showHome={true}
      />

      <HeroSection>
        <Title level={1} className="hero-title">
          {t('contact.title')}
        </Title>
        <Paragraph className="hero-subtitle">
          {t('contact.subtitle')}
        </Paragraph>
      </HeroSection>

      <Card className="carousel-card">
        <Carousel
          autoplay
          dots={{ className: 'carousel-dots' }}
          effect="fade"
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <SlideContent color={slide.color}>
                <div className="slide-icon">{slide.icon}</div>
                <Title level={2} className="slide-title">
                  {slide.title}
                </Title>
                <Paragraph className="slide-description">
                  {slide.description}
                </Paragraph>
              </SlideContent>
            </div>
          ))}
        </Carousel>
      </Card>

      <Row gutter={[24, 24]} className="features-section">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <FeatureCard>
              <div className="feature-icon">{feature.icon}</div>
              <Title level={4} className="feature-title">
                {feature.title}
              </Title>
              <Paragraph className="feature-description">
                {feature.description}
              </Paragraph>
            </FeatureCard>
          </Col>
        ))}
      </Row>

      <TeamSection>
        <Title level={2} className="section-title">
          {t('contact.team.title')}
        </Title>
        <Paragraph className="section-description">
          {t('contact.team.description')}
        </Paragraph>
        
        <Row gutter={[24, 24]} className="team-members">
          {teamMembers.map((member, index) => (
            <Col xs={24} md={8} key={index}>
              <TeamMemberCard>
                <Avatar 
                  size={80} 
                  icon={<UserOutlined />}
                  className="member-avatar"
                  style={{ 
                    backgroundColor: index === 0 ? '#1890ff' : 
                                   index === 1 ? '#52c41a' : '#722ed1',
                    fontSize: '32px'
                  }}
                />
                <Title level={3} className="member-name">
                  {member.name}
                </Title>
                <Text className="member-role">{member.role}</Text>
                <Paragraph className="member-description">
                  {member.description}
                </Paragraph>
                <div className="member-social">
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <GithubOutlined className="social-icon" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedinOutlined className="social-icon" />
                  </a>
                  <a href={`mailto:${member.email}`}>
                    <MailOutlined className="social-icon" />
                  </a>
                </div>
              </TeamMemberCard>
            </Col>
          ))}
        </Row>
      </TeamSection>

      <ContactInfo>
        <Title level={2} className="section-title">
          {t('contact.contactInfo.title')}
        </Title>
        <Paragraph className="section-description">
          {t('contact.contactInfo.description')}
        </Paragraph>
        
        <Row gutter={[24, 24]} className="contact-details">
          <Col xs={24} md={8}>
            <Card className="contact-card">
              <MailOutlined className="contact-icon" />
              <Title level={4}>{t('contact.contactInfo.email')}</Title>
              <Paragraph>info@medichecker.com</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="contact-card">
              <GithubOutlined className="contact-icon" />
              <Title level={4}>{t('contact.contactInfo.github')}</Title>
              <Paragraph>github.com/medichecker</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="contact-card">
              <LinkedinOutlined className="contact-icon" />
              <Title level={4}>{t('contact.contactInfo.linkedin')}</Title>
              <Paragraph>linkedin.com/company/medichecker</Paragraph>
            </Card>
          </Col>
        </Row>
      </ContactInfo>
    </ContactContainer>
  )
}
