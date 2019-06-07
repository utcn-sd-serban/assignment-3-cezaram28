package com.cezaram28.Assignment1.event;

import com.cezaram28.Assignment1.dto.UserDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserUpdatedEvent extends BaseEvent {
    private final UserDTO userDTO;

    public UserUpdatedEvent(UserDTO userDTO) {
        super(EventType.USER_UPDATED);
        this.userDTO = userDTO;
    }
}
