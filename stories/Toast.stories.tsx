import { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { useToastStore } from '@stores/useToastStore';

import Toast from '@components/Toast/Toast';

// 버튼 스타일 정의
const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginRight: '10px',
  marginBottom: '8px',
};

const successButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#4CAF50',
  color: 'white',
};

const errorButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#F44336',
  color: 'white',
};

const defaultButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#2196F3',
  color: 'white',
};

const clearButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#9E9E9E',
  color: 'white',
};

const formGroupStyle = {
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
};

const labelStyle = {
  minWidth: '120px',
  marginRight: '10px',
  fontWeight: 500,
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  width: '200px',
};

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error'],
      description: '토스트 메시지 타입',
    },
    message: {
      control: 'text',
      description: '토스트 메시지 내용',
    },
    duration: {
      control: { type: 'range', min: 1000, max: 10000, step: 1000 },
      description: '토스트 표시 지속 시간 (ms)',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '400px',
          height: '200px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    id: '1',
    message: '성공적으로 처리되었습니다.',
    type: 'success',
  },
};

export const Error: Story = {
  args: {
    id: '2',
    message: '오류가 발생했습니다.',
    type: 'error',
  },
};

export const ShortDuration: Story = {
  args: {
    id: '3',
    message: '짧은 지속 시간 토스트',
    type: 'success',
    duration: 2000,
  },
};

export const LongDuration: Story = {
  args: {
    id: '4',
    message: '긴 지속 시간 토스트',
    type: 'error',
    duration: 8000,
  },
};

// 토스트 스토어를 사용하여 여러 토스트를 동시에 표시하는 스토리
const MultipleToastsTemplate = () => {
  const { addToast, clearToasts, toasts } = useToastStore();

  // 컴포넌트가 마운트될 때 토스트 초기화
  useEffect(() => {
    clearToasts();

    return () => clearToasts();
  }, [clearToasts]);

  const handleAddSuccessToast = () => {
    addToast({
      type: 'success',
      message: '성공 메시지입니다.',
      duration: 5000,
    });
  };

  const handleAddErrorToast = () => {
    addToast({
      type: 'error',
      message: '오류 메시지입니다.',
      duration: 5000,
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>토스트 메시지 테스트</h2>
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap' }}>
        <button type='button' onClick={handleAddSuccessToast} style={successButtonStyle}>
          성공 토스트 추가
        </button>
        <button type='button' onClick={handleAddErrorToast} style={errorButtonStyle}>
          오류 토스트 추가
        </button>
        <button type='button' onClick={clearToasts} style={clearButtonStyle}>
          모든 토스트 제거
        </button>
      </div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '300px',
          zIndex: 1000,
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} duration={toast.duration} />
        ))}
      </div>
    </div>
  );
};

export const MultipleToasts: StoryObj = {
  render: () => <MultipleToastsTemplate />,
  parameters: {
    layout: 'fullscreen',
  },
};

// 토스트 상호작용 테스트를 위한 스토리
const InteractiveToastTemplate = () => {
  const { addToast, clearToasts, toasts } = useToastStore();

  useEffect(() => {
    clearToasts();

    return () => clearToasts();
  }, [clearToasts]);

  const handleAddCustomToast = () => {
    const messageInput = document.getElementById('toast-message') as HTMLInputElement;
    const typeSelect = document.getElementById('toast-type') as HTMLSelectElement;
    const durationInput = document.getElementById('toast-duration') as HTMLInputElement;

    addToast({
      type: typeSelect.value as 'success' | 'error',
      message: messageInput.value || '기본 메시지',
      duration: Number(durationInput.value) || 5000,
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>커스텀 토스트 생성</h2>
      <div
        style={{
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f5',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div style={formGroupStyle}>
          <label htmlFor='toast-message' style={labelStyle}>
            메시지:
          </label>
          <input id='toast-message' type='text' defaultValue='커스텀 메시지' style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor='toast-type' style={labelStyle}>
            타입:
          </label>
          <select id='toast-type' defaultValue='success' style={inputStyle}>
            <option value='success'>성공</option>
            <option value='error'>오류</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor='toast-duration' style={labelStyle}>
            지속 시간(ms):
          </label>
          <input
            id='toast-duration'
            type='number'
            defaultValue='5000'
            min='1000'
            max='10000'
            step='1000'
            style={inputStyle}
          />
        </div>
        <div style={{ marginTop: '20px', display: 'flex' }}>
          <button type='button' onClick={handleAddCustomToast} style={defaultButtonStyle}>
            커스텀 토스트 추가
          </button>
          <button type='button' onClick={clearToasts} style={clearButtonStyle}>
            모든 토스트 제거
          </button>
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '300px',
          zIndex: 1000,
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} duration={toast.duration} />
        ))}
      </div>
    </div>
  );
};

export const InteractiveToast: StoryObj = {
  render: () => <InteractiveToastTemplate />,
  parameters: {
    layout: 'fullscreen',
  },
};
