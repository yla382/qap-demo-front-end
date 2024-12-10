const parseDate = (utcDate) => {
    if (!utcDate) return "N/A";
    const timestamp = parseInt(utcDate.replace(/\/Date\((\d+)(?:[+-]\d+)?\)\//, "$1"));
    const date = new Date(timestamp);
    return date.toLocaleString();
};

const formatAddresses = (addresses) => {
    if (!addresses || addresses.length === 0) return null;

    return (
        <div style={{ marginLeft: '20px' }}>
            {addresses.map((address, idx) => {
                const { AddressType, City, Region, PostalCode, Country, AttentionTo } = address;
                return (
                    <li key={idx}>
                        <strong>{AddressType || `Address ${idx + 1}`}: </strong>
                        <ul>
                            {City && <li><strong>City:</strong> {City}</li>}
                            {Region && <li><strong>Region:</strong> {Region}</li>}
                            {PostalCode && <li><strong>Postal Code:</strong> {PostalCode}</li>}
                            {Country && <li><strong>Country:</strong> {Country}</li>}
                            {AttentionTo && <li><strong>Attention To:</strong> {AttentionTo}</li>}
                        </ul>
                    </li>
                );
            })}
        </div>
    );
};

const formatPhones = (phones) => {
    if (!phones || phones.length === 0) return null;

    return (
        <div style={{ marginLeft: '20px' }}>
            {phones.map((phone, idx) => {
                const { PhoneType, PhoneCountryCode, PhoneAreaCode, PhoneNumber } = phone;
                const formattedPhone = [
                    PhoneCountryCode && `+${PhoneCountryCode}`,
                    PhoneAreaCode,
                    PhoneNumber,
                ]
                    .filter(Boolean)
                    .join("-");
                return (
                    <li key={idx}>
                        <strong>{PhoneType || `Phone ${idx + 1}`}: </strong> {formattedPhone || "N/A"}
                    </li>
                );
            })}
        </div>
    );
};

const formatAccountsPayable = (value) => {
    return (value === null || value === undefined ? "N/A" : value);
};

const DialogTemplate = {
    account: [
        { key: "Code", label: "Account Code" },
        { key: "Name", label: "Account Name" },
        { key: "AccountID", label: "Account ID" },
        { key: "Type", label: "Account Type" },
        { key: "Status", label: "Status" },
        { key: "Description", label: "Description" },
        { key: "BankAccountType", label: "BankAccountType" },
        { key: "TaxType", label: "TaxType" },
        { key: "Class", label: "Class" },
        { key: "SystemAccount", label: "SystemAccount" },
        { key: "ReportingCode", label: "ReportingCode" },
        { key: "ReportingCodeName", label: "ReportingCodeName" },
        { key: "UpdatedDateUTC", label: "Last Updated", format: parseDate },
    ],
    vendor: [
        { key: "ContactID", label: "Vendor ID" },
        { key: "Name", label: "Vendor Name" },
        { key: "FirstName", label: "FirstName" },
        { key: "LastName", label: "LastName" },
        { key: "EmailAddress", label: "EmailAddress" },
        { key: "BankAccountDetails", label: "BankAccountDetails" },
        { key: "TaxNumber", label: "TaxNumber" },
        { key: "DefaultCurrency", label: "Currency" },
        { key: "Addresses", label: "Addresses", format: formatAddresses },
        { key: "Phones", label: "Phones", format: formatPhones },
        { key: "accountsPayableOutstanding", label: "Accounts Payable Outstanding", format: formatAccountsPayable },
        { key: "accountsPayableOverdue", label: "Accounts Payable Overdue", format: formatAccountsPayable },        
        { key: "UpdatedDateUTC", label: "Last Updated", format: parseDate },
    ],
};

export default DialogTemplate;