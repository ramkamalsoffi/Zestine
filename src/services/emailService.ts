import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  requirements?: string;
  location?: string;
  product?: string;
}

/**
 * Sends data placeholders only. 
 * Exactly matching your required structure.
 */
export const sendContactEmail = async (data: EmailData) => {
  const templateParams = {
    title: `Contact Us - ${data.name}`,
    form_type: 'Contact Form Inquiry',
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone || 'N/A',
    product: 'N/A',
    location: 'N/A',
    requirements: data.requirements || 'None'
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};

export const sendProductRequestEmail = async (data: EmailData) => {
  const isWaitlist = data.product === 'ZeManage' || data.product === 'ZeConnect' || data.product === 'ZeFacility';
  const actionType = isWaitlist ? 'Waitlist Request' : 'Interest Request';

  const templateParams = {
    title: `Products - ${data.product} ${actionType} - ${data.name}`,
    form_type: actionType,
    name: data.name,
    email: data.email,
    company: data.company,
    phone: 'N/A',
    product: data.product,
    location: data.location || 'N/A',
    requirements: 'Interest in Zestine products'
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};
