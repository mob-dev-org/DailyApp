// import { fireEvent, render } from '@testing-library/react-native';

// import {color} from '../../../const/variables';
// import Text from '../../atoms/Text';

// import HeaderWithoutImage from './index';
// import HeaderWithoutImage from './index';

// jest.mock('react-native-safe-area-context', () => {
//     const inset = {top: 0, right: 0, bottom: 0, left: 0};
//     return {
//         SafeAreaProvider: jest.fn().mockImplementation(({children}) => children),
//         SafeAreaConsumer: jest
//             .fn()
//             .mockImplementation(({children}) => children(inset)),
//         useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
//     };
// });

// describe('HeaderWithoutImage', () => {
//     it('When header is passed render text', () => {
//         const {getByText} = render(<HeaderWithoutImage header="Moje adrese" />);
//         expect(getByText('Moje adrese')).toBeDefined();
//     });

//     it('When icon name is passed render it', () => {
//         const { getByTestId } = render(<HeaderWithoutImage header="Moje adrese" icon="filter" />);
//         expect(getByTestId('filterIcon')).toBeDefined();
//     });
// });
