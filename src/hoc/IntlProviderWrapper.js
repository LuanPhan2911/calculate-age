import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import LanguageUtils from "../utils/LanguageUtils";
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/vi';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';

const IntlProviderWrapper = (props) => {
    const { children } = props;
    const messages = LanguageUtils.getFlattenedMessages();
    const language = useSelector((state) => state.app.language);

    return (
        <IntlProvider locale={language}
            messages={messages[language]}
            defaultLocale="vi">
            {children}
        </IntlProvider>
    )
}
export default IntlProviderWrapper;