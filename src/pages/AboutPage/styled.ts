import styled from 'styled-components';
import { 
  SPACING, 
  BORDER_RADIUS, 
  COLORS, 
  FONT_WEIGHT, 
  TRANSITIONS 
} from '@/constants';

export const TechnologyCard = styled.div`
  padding: ${SPACING.PADDING_LG};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  border-radius: ${BORDER_RADIUS.MD};
  background: ${COLORS.BG_SECONDARY};
  transition: ${TRANSITIONS.NORMAL};
  height: 100%;
  
  &:hover {
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .tech-header {
    display: flex;
    align-items: center;
    margin-bottom: ${SPACING.MARGIN_MD};
  }
  
  .tech-title {
    margin: 0;
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
  }
  
  .tech-description {
    margin-bottom: ${SPACING.MARGIN_SM};
    color: ${COLORS.TEXT_SECONDARY};
    line-height: 1.6;
  }
  
  .tech-stack {
    color: ${COLORS.TEXT_PRIMARY};
    font-weight: ${FONT_WEIGHT.MEDIUM};
  }
`;
