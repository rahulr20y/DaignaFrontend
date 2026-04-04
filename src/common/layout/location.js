import React from "react";
import {
  Button,
  Elements,
  OffCanvas,
  debounce,
  links,
  API,
  showAlertMessage,
} from "../index";

function Location(props) {
  const [typedLocation, setTypedLocation] = React.useState("");
  const [suggestLocations, setSuggestLocations] = React.useState([]);

  React.useEffect(() => {
    if (typedLocation.length > 0) debounce(getLocationSuggestions);
  }, [typedLocation]);

  const getLocationSuggestions = () => {
    API({
      ...links.get_location,
      urlparams: { query: typedLocation },
      bodydata: {},
      isfile: false,
      callback: (res) => {
        if (res.data.status === 200) {
          setSuggestLocations(res.data.data);
        }
      },
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleCurrentLocation,
        (error) => {
          showAlertMessage(error.message, "warning");
        }
      );
    } else {
      showAlertMessage("Geolocation is not supported on this device", "info");
    }
  };

  const handleCurrentLocation = (position) => {
    API({
      ...links.get_current_location,
      urlparams: {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      },
      bodydata: {},
      isfile: false,
      callback: (res) => {
        if (res.data.status === 200) {
          setSuggestLocations(res.data.data);
        }
      },
    });
  };

  const handleLocationSelect = (location) => {
    setTypedLocation("");
    props.updateLocation({ base: props.location.base, current: location });
    window.bootstrap.Offcanvas.getOrCreateInstance(
      document.getElementById("location_offcanvas")
    ).hide();
  };

  return (
    <div
      style={{
        maxWidth: 120,
        width: 120,
      }}
    >
      {/* <Button
				text={
					<>
						<i className='bi bi-geo-alt me-1' />
						{props.location.current.district === undefined
							? 'Choose your Location'
							: props.location.current.district}
					</>
				}
				variant='icon'
				color='dark'
				className='font-16 fw-bold mw-100 text-truncate text-start'
				toggle='offcanvas'
				target='location_offcanvas'
			/> */}
      {/* <OffCanvas
				id='location_offcanvas'
				title='Location'
				body={
					<>
						<Elements
							formField={[
								{
									type: 'text',
									id: 'curr_location',
									value: typedLocation,
									onchange: (value, id) => {
										setTypedLocation(value)
									},
									className: 'my-2',
									label: 'Search location',
								},
							]}
						/>

						<div className='btn' onClick={getCurrentLocation}>
							Use your current location
						</div>

						<div className='my-4'>
							{suggestLocations.length === 0 ? (
								<p className='mx-1'>
									{typedLocation === ''
										? 'Start typing to get suggestions...'
										: "Looks like there isn't any district with that name. Try searching with an alternate name."}
								</p>
							) : (
								suggestLocations.map((item) => {
									return (
										<p
											key={item.district}
											style={{ cursor: 'pointer' }}
											className='mx-1 my-2 p-2 bg-light'
											onClick={() => handleLocationSelect(item)}
										>
											{item.district}, {item.state}
										</p>
									)
								})
							)}
						</div>
					</>
				}
			/> */}
    </div>
  );
}

export default Location;
