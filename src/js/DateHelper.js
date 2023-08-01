export default class DateHelper {
    
    static formatCreatedDate(dateString) {

        const options = { month: 'long', day: 'numeric', year: 'numeric' };

        return new Date(dateString).toLocaleString('en-US', options);
    }

    static formatDate(dateString) {

        const date = new Date(dateString);

        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    static getDatesFromContent(content) {
        
        const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;

        const matchedDates = content.match(dateRegex);

        return matchedDates ? matchedDates.filter(stringDate => {

            const date = new Date(stringDate);

            return (date > new Date('01.01.1800') && date < new Date('01.01.2200'));
        }) : [];

    }
}