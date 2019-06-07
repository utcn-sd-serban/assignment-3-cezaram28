package com.cezaram28.Assignment1.event;

import com.cezaram28.Assignment1.dto.UserDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserCreatedEvent extends BaseEvent {
    private final UserDTO userDTO;

    public UserCreatedEvent(UserDTO userDTO) {
        super(EventType.USER_CREATED);
        this.userDTO = userDTO;
    }
}
