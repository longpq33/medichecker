import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import {
  RobotOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/hooks/useLanguage';
import { Breadcrumb } from '@/components';

const { Title, Paragraph, Text } = Typography;

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Breadcrumb
      showHome={true}
        items={[
          {
            title: t('about.title'),
            path: '/about'
          },
          
        ]}
      />


      
      {/* AI Agent Analysis Section */}
      <Card 
        style={{ marginBottom: '24px' }}
        title={
          <span>
            <RobotOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            {t('about.aiAgentTitle')}
          </span>
        }
      >
        <Paragraph style={{ textAlign: 'center', marginBottom: '24px', fontSize: '16px' }}>
          {t('about.aiAgentDescription')}
        </Paragraph>
        
        <Row gutter={[24, 24]}>
          {/* Advantages */}
          <Col xs={24} md={12}>
            <div style={{ 
              padding: '20px', 
              border: '1px solid #52c41a', 
              borderRadius: '8px',
              backgroundColor: '#f6ffed'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <CheckCircleOutlined style={{ 
                  marginRight: '8px', 
                  color: '#52c41a',
                  fontSize: '24px'
                }} />
                <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
                  {t('about.aiAgentAdvantages')}
                </Title>
              </div>
              <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                <li><Text>{t('about.advantage1')}</Text></li>
                <li><Text>{t('about.advantage2')}</Text></li>
                <li><Text>{t('about.advantage3')}</Text></li>
                <li><Text>{t('about.advantage4')}</Text></li>
                <li><Text>{t('about.advantage5')}</Text></li>
                <li><Text>{t('about.advantage6')}</Text></li>
              </ul>
            </div>
          </Col>
          
          {/* Disadvantages */}
          <Col xs={24} md={12}>
            <div style={{ 
              padding: '20px', 
              border: '1px solid #fa541c', 
              borderRadius: '8px',
              backgroundColor: '#fff2e8'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <ExclamationCircleOutlined style={{ 
                  marginRight: '8px', 
                  color: '#fa541c',
                  fontSize: '24px'
                }} />
                <Title level={4} style={{ margin: 0, color: '#fa541c' }}>
                  {t('about.aiAgentDisadvantages')}
                </Title>
              </div>
              <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                <li><Text>{t('about.disadvantage1')}</Text></li>
                <li><Text>{t('about.disadvantage2')}</Text></li>
                <li><Text>{t('about.disadvantage3')}</Text></li>
                <li><Text>{t('about.disadvantage4')}</Text></li>
                <li><Text>{t('about.disadvantage5')}</Text></li>
                <li><Text>{t('about.disadvantage6')}</Text></li>
              </ul>
            </div>
          </Col>
        </Row>
        
        {/* Best Practices */}
        <div style={{ marginTop: '24px' }}>
          <Title level={4} style={{ 
            textAlign: 'center', 
            marginBottom: '20px',
            color: '#1890ff'
          }}>
            {t('about.bestPractices')}
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                <li><Text>{t('about.practice1')}</Text></li>
                <li><Text>{t('about.practice2')}</Text></li>
                <li><Text>{t('about.practice3')}</Text></li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                <li><Text>{t('about.practice4')}</Text></li>
                <li><Text>{t('about.practice5')}</Text></li>
                <li><Text>{t('about.practice6')}</Text></li>
              </ul>
            </Col>
          </Row>
        </div>
        
        {/* Development Workflow */}
        <div style={{ marginTop: '24px' }}>
          <Title level={4} style={{ 
            textAlign: 'center', 
            marginBottom: '20px',
            color: '#1890ff'
          }}>
            {t('about.developmentWorkflow')}
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                <li><Text>{t('about.workflow1')}</Text></li>
                <li><Text>{t('about.workflow2')}</Text></li>
                <li><Text>{t('about.workflow3')}</Text></li>
              </ul>
            </Col>
            <Col xs={24} md={12}>
              <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                <li><Text>{t('about.workflow4')}</Text></li>
                <li><Text>{t('about.workflow5')}</Text></li>
                <li><Text>{t('about.workflow6')}</Text></li>
              </ul>
            </Col>
          </Row>
        </div>
      </Card>

     

      
    </div>
  );
};
