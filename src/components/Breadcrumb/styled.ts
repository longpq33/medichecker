import styled from 'styled-components';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, TRANSITIONS } from '@/constants';

export const BreadcrumbContainer = styled.div`
  margin-bottom: ${SPACING.MARGIN_LG};
  padding: ${SPACING.PADDING_MD} 0;
  
  .ant-breadcrumb {
    font-size: ${FONT_SIZE.SM};
    
    .ant-breadcrumb-separator {
      color: ${COLORS.TEXT_SECONDARY};
      margin: 0 ${SPACING.MARGIN_SM};
    }
  }
`;

export const BreadcrumbItem = styled.span<{
  $clickable: boolean;
  $isLast: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.GAP_SM};
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  color: ${props => props.$isLast ? COLORS.TEXT_PRIMARY : COLORS.TEXT_SECONDARY};
  font-weight: ${props => props.$isLast ? FONT_WEIGHT.SEMIBOLD : FONT_WEIGHT.NORMAL};
  transition: ${TRANSITIONS.NORMAL};
  
  .breadcrumb-icon {
    display: flex;
    align-items: center;
    font-size: ${FONT_SIZE.SM};
  }
  
  .breadcrumb-text {
    font-size: ${FONT_SIZE.SM};
  }
  
  ${props => props.$clickable && `
    &:hover {
      color: ${COLORS.PRIMARY};
      
      .breadcrumb-icon {
        color: ${COLORS.PRIMARY};
      }
    }
  `}
  
  ${props => props.$isLast && `
    color: ${COLORS.TEXT_PRIMARY};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
  `}
`;
