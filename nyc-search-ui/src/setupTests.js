import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

const contentInsideLS = {"login":true,"userId":1,"userName":"zjtisme","password":"123456","firstName":"Tony","lastName":"Zhang","gender":"Male","email":"jintai@gmail.com","phoneNumber":"224-123-4567","birthday":"1993-09-09","contentToBeRendered":"HomePage","loginErrorMSG":"","signupErrorMSG":"","configureErrorMSG":""};
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

mockGetItem.mockReturnValue(null);
mockSetItem.mockReturnValue(undefined);
mockRemoveItem.mockReturnValue(undefined);

const localStorageMock = {
  getItem: mockGetItem,
  setItem: mockSetItem,
  removeItem: mockRemoveItem
};
global.localStorage = localStorageMock;

configure({ adapter: new Adapter() });
