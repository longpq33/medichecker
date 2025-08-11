import React, { useState } from 'react'
import { 
  Card, 
  Button, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Space, 
  Typography, 
  Alert, 
  Divider,
  Row,
  Col,
  Statistic,
  Tag
} from 'antd'
import { 
  FileTextOutlined, 
  SafetyOutlined, 
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { useAnalysis } from '@/hooks/useAnalysis'
import type { PrescriptionAnalysisResponse } from '@/types'
import { 
  getOverallRisk,
  getRiskLevel,
  getTotalDrugs, 
  getTotalCost, 
  getRecommendations, 
  getReportDetail 
} from '@/utils/analysisHelpers'
import styled from 'styled-components'

const { Text } = Typography


const StyledCard = styled(Card)`
  margin-bottom: 16px;
  
  .ant-card-head {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    color: white;
    
    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }
`

const AnalysisResultsCard = styled(Card)`
  margin-top: 16px;
  
  .safety-score {
    text-align: center;
    margin-bottom: 16px;
    
    .score-value {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .score-label {
      font-size: 16px;
      margin-bottom: 8px;
    }
  }
  
  .recommendations {
    .recommendation-item {
      margin-bottom: 8px;
      padding: 8px;
      border-radius: 6px;
      
      &.compatible {
        background-color: #f6ffed;
        border: 1px solid #b7eb8f;
      }
      
      &.necessary {
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
      }
      
      &.unnecessary {
        background-color: #fff2e8;
        border: 1px solid #ffbb96;
      }
    }
  }
`

export const PrescriptionAnalysis: React.FC = () => {
  const { t } = useLanguage()
  const { 
    loading, 
    error, 
    phanTichDonThuoc, 
    clearError 
  } = useAnalysis()
  
  const [form] = Form.useForm()
  const [analysisResult, setAnalysisResult] = useState<PrescriptionAnalysisResponse | null>(null)

  const onFinish = async (values: Record<string, unknown>) => {
    try {
      clearError()
      const result = await phanTichDonThuoc({
        prescription_list: (values.danhSachThuoc as Array<{
          thuocId: number
          soLuong: number
          lieuDung: string
          duongDung: string
          tanSuat: string
          thoiGianDung: string
        }>)?.map(item => ({
          drug_name: `Thuốc ${item.thuocId}`,
          dosage: item.lieuDung || 'Không xác định',
          frequency: item.tanSuat || 'Không xác định'
        })) || [],
        allergies: values.allergies as string[] || [],
        medical_history: values.medical_history as string[] || []
      })
      setAnalysisResult(result)
    } catch (err) {
      console.error('Analysis error:', err)
    }
  }

  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case 'AN_TOAN':
        return 'success'
      case 'CAN_THAN_TRONG':
        return 'warning'
      case 'NGUY_HIEM':
        return 'error'
      default:
        return 'default'
    }
  }

  const getSafetyLevelIcon = (level: string) => {
    switch (level) {
      case 'AN_TOAN':
        return <CheckCircleOutlined />
      case 'CAN_THAN_TRONG':
        return <ExclamationCircleOutlined />
      case 'NGUY_HIEM':
        return <CloseCircleOutlined />
      default:
        return <InfoCircleOutlined />
    }
  }

  return (
    <div>
      <StyledCard
        title={
          <Space>
            <FileTextOutlined />
            {t('analysis.prescriptionAnalysis')}
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            danhSachThuoc: [{ thuocId: 1, soLuong: 1, lieuDung: '', duongDung: '', tanSuat: '', thoiGianDung: '' }],
            allergies: [],
            medical_history: []
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="allergies"
                label="Dị ứng thuốc"
              >
                <Select
                  mode="tags"
                  placeholder="Nhập dị ứng thuốc (nếu có)"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="medical_history"
                label="Bệnh lý nền"
              >
                <Select
                  mode="tags"
                  placeholder="Nhập bệnh lý nền (nếu có)"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Danh sách thuốc</Divider>

          <Form.List name="danhSachThuoc">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} align="middle">
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, 'thuocId']}
                        rules={[{ required: true, message: 'Vui lòng chọn thuốc!' }]}
                      >
                        <InputNumber style={{ width: '100%' }} placeholder="ID thuốc" />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        {...restField}
                        name={[name, 'soLuong']}
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                      >
                        <InputNumber min={1} style={{ width: '100%' }} placeholder="Số lượng" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, 'lieuDung']}
                        rules={[{ required: true, message: 'Vui lòng nhập liều dùng!' }]}
                      >
                        <Input placeholder="Liều dùng" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, 'duongDung']}
                        rules={[{ required: true, message: 'Vui lòng nhập đường dùng!' }]}
                      >
                        <Input placeholder="Đường dùng" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, 'tanSuat']}
                        rules={[{ required: true, message: 'Vui lòng nhập tần suất!' }]}
                      >
                        <Input placeholder="Tần suất" />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        {...restField}
                        name={[name, 'thoiGianDung']}
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian dùng!' }]}
                      >
                        <Input placeholder="Thời gian" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button 
                        type="text" 
                        danger 
                        onClick={() => remove(name)}
                        disabled={fields.length === 1}
                      >
                        Xóa
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Thêm thuốc
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SafetyOutlined />}
              size="large"
            >
              {t('analysis.startAnalysis')}
            </Button>
          </Form.Item>
        </Form>

        {error && (
          <Alert
            message="Lỗi phân tích"
            description={error}
            type="error"
            showIcon
            closable
            onClose={clearError}
            style={{ marginTop: 16 }}
          />
        )}
      </StyledCard>

      {analysisResult && (
        <AnalysisResultsCard
          title={
            <Space>
              <InfoCircleOutlined />
              {t('analysis.analysisResults')}
            </Space>
          }
        >
          <div className="safety-score">
            <div className="score-value">
              {getOverallRisk(analysisResult)}
            </div>
            <div className="score-label">
              <Tag 
                color={getSafetyLevelColor(getRiskLevel(analysisResult))}
                icon={getSafetyLevelIcon(getRiskLevel(analysisResult))}
              >
                Mức độ rủi ro: {getOverallRisk(analysisResult)}
              </Tag>
            </div>
          </div>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Statistic
                title={t('analysis.totalMedicines')}
                value={getTotalDrugs(analysisResult)}
                prefix={<FileTextOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={t('analysis.totalCost')}
                value={getTotalCost(analysisResult).toLocaleString()}
                prefix="₫"
                valueStyle={{ color: '#3f8600' }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Mức độ rủi ro"
                value={getOverallRisk(analysisResult)}
                valueStyle={{ color: getSafetyLevelColor(getRiskLevel(analysisResult)) === 'success' ? '#3f8600' : '#cf1322' }}
              />
            </Col>
          </Row>

          <Divider>{t('analysis.recommendations')}</Divider>

          <div className="recommendations">
            {getRecommendations(analysisResult, 'tongHop').length > 0 && (
              <div className="recommendation-item compatible">
                <Text strong>✅ {t('analysis.compatible')}:</Text>
                <ul style={{ margin: '8px 0 0 20px' }}>
                  {getRecommendations(analysisResult, 'tongHop').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {getRecommendations(analysisResult, 'canThiet').length > 0 && (
              <div className="recommendation-item necessary">
                <Text strong>💡 {t('analysis.necessary')}:</Text>
                <ul style={{ margin: '8px 0 0 20px' }}>
                  {getRecommendations(analysisResult, 'canThiet').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {getRecommendations(analysisResult, 'khongCanThiet').length > 0 && (
              <div className="recommendation-item unnecessary">
                <Text strong>⚠️ {t('analysis.unnecessary')}:</Text>
                <ul style={{ margin: '8px 0 0 20px' }}>
                  {getRecommendations(analysisResult, 'khongCanThiet').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Divider>{t('analysis.detailedReport')}</Divider>

          <Row gutter={16}>
            <Col span={8}>
              <Text strong>{t('analysis.analysisDate')}:</Text>
              <br />
              <Text>{getReportDetail(analysisResult, 'ngayPhanTich')}</Text>
            </Col>
            <Col span={8}>
              <Text strong>{t('analysis.analyzer')}:</Text>
              <br />
              <Text>{getReportDetail(analysisResult, 'nguoiPhanTich')}</Text>
            </Col>
            <Col span={8}>
              <Text strong>{t('analysis.notes')}:</Text>
              <br />
              <Text>{getReportDetail(analysisResult, 'ghiChu')}</Text>
            </Col>
          </Row>
        </AnalysisResultsCard>
      )}
    </div>
  )
}
