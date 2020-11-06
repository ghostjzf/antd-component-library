import React from 'react';
import BaseForm from './form/BaseForm';
import { BaseFormProps } from './types/form.type';

const EasyForm: React.FC<BaseFormProps> = props => {
    return <BaseForm {...props} />;
};

export default EasyForm;
