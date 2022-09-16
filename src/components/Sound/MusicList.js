import { useState, useEffect } from "react";
// import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import Select from 'react-select';

const MusicList = (props) => {
    let options = [];
    const [selectedOption, setSelectedOption] = useState('');
    const { intl } = props;
    useEffect(() => {
        props.musicList && props.musicList.length > 0 &&
            props.musicList.map((item) => {
                let obj = {};
                let name = intl.formatMessage({ id: `${item.name}` });
                obj.label = `${name} - ${item.auth}`;
                obj.value = item.url;
                options.push(obj);
                return item;
            })
    }, [props]);
    const handleChange = (selectedOption) => {

        setSelectedOption(selectedOption);
        props.handleSetSelectedSong(selectedOption);
    }

    return (
        <>
            <Select
                options={options}
                onChange={handleChange}
                value={selectedOption}
            />
        </>
    )
}
export default injectIntl(MusicList);