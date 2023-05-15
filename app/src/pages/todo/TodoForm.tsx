import { Typography, Button, Form, Input, Space } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface TodoFormValues {
  name: string;
  description: string;
}

interface TodoFormProps {
  initialValues?: TodoFormValues;
  onSubmit: (values: TodoFormValues) => void;
  title: string;
  onCancel?: () => void;
  disabled?: boolean;
}

export function TodoForm({
  initialValues,
  onSubmit,
  onCancel,
  title,
  disabled = false,
}: TodoFormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: TodoFormValues) => {
    form.resetFields();
    onSubmit(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        {title}
      </Typography.Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        disabled={disabled}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, min: 3, max: 50 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, min: 3, max: 300 }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Describe what you need to do..."
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            {onCancel && (
              <Button htmlType="button" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
