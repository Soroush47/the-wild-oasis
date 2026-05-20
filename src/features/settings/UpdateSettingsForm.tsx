import { useSettings } from "./useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

interface Settings {
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}

function UpdateSettingsForm() {
    const { isLoading, settings } = useSettings();
    const { isUpdating, updateMutation } = useUpdateSetting();
    const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } =
        settings ?? {};

    const handleUpdate = (e: React.FocusEvent<HTMLInputElement>) => {
        type Name = keyof Settings;
        const name = e.target.name as Name;
        const value = e.target.value;
        // const { value, name }: { value: string; name: Name } = e.target;
        if (!value || +value === settings[name]) return;

        // type Setting = {
        //     [k in keyof Settings]: number;
        // };
        const setting: Partial<Settings> = { [name]: +value };
        updateMutation(setting);
    };

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    name="minBookingLength"
                    disabled={isUpdating}
                    defaultValue={minBookingLength}
                    onBlur={handleUpdate}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    name="maxBookingLength"
                    disabled={isUpdating}
                    defaultValue={maxBookingLength}
                    onBlur={handleUpdate}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    name="maxGuestsPerBooking"
                    disabled={isUpdating}
                    defaultValue={maxGuestsPerBooking}
                    onBlur={handleUpdate}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    name="breakfastPrice"
                    disabled={isUpdating}
                    defaultValue={breakfastPrice}
                    onBlur={handleUpdate}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
