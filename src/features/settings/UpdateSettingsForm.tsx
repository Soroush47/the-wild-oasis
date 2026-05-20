import { useSettings } from "./useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
    const { isLoading, settings } = useSettings();
    const { isUpdating, updateMutation } = useUpdateSetting();
    const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } =
        settings ?? {};

    const handleUpdate = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (!value || +value === settings[name]) return;
        updateMutation({ [name]: +value });
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
